const express = require("express");
const User = require("../Model/UserSchema")
const Withdraw = require("../Model/WithdrawSchema")
const router = express.Router();
const fetchuser = require('../Middleware/FetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_KEY = "ErnForView";

//Create a user 
router.post("/requestWithdraw", async (req, res) => {

    let { token } = req.body;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;
        const UserFind = await User.findById(id); // Find the document by ID
        if (!UserFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        const withdraw = await Withdraw.create({
            email: UserFind.email,
            number: req.body.number,
            WithdrawAccount: req.body.Account,
            Amount: req.body.Amount,
            UserId:id
        })

        success = true;
        res.json({ success, withdraw })

    } catch (error) {
        success=false;
        res.json({success});
        res.status(500).send('error occured 53')
    }
})


router.get("/FetchWithdraw", async (req, res) => {
    try {
        const withdraw = await Withdraw.find();

        res.json(withdraw);
    } catch (error) {
        console.error(error)
        res.status(500).send('network error occured')
    }

})


router.delete("/WithdrawDone/:id", async (req, res) => {
    try {

        let withdraw = await Withdraw.findById(req.params.id);
        if (!withdraw) {
            return res.status(404).send("Not Found")
        }

        // console.log(withdraw)

        const UserFind = await User.findById(withdraw.UserId); // Find the document by ID
        if (!UserFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        UserFind.Earning = UserFind.Earning - withdraw.Amount; // Add the new IP to the watchedIPs array
        await UserFind.save();

        withdraw = await Withdraw.findByIdAndDelete(req.params.id)
        res.json("Successfull node deleted")

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})



router.delete("/WithdrawDeny/:id", async (req, res) => {
    try {

        let withdraw = await Withdraw.findById(req.params.id);
        if (!withdraw) {
            return res.status(404).send("Not Found")
        }

        withdraw = await Withdraw.findByIdAndDelete(req.params.id)
        res.json("Successfull node deleted")

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }

})


// // Login a user
// router.post("/login", async (req, res) => {
//     let success = false;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     console.log(email)

//     try {
//         let user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({ Message: "Account doesn't Fine" })
//         }

//         const passwordCompare = await bcrypt.compare(password, user.password)

//         if (!passwordCompare) {
//             return res.status(400).json({ Message: "Account doesnt" })
//         }

//         const Payload = {
//             user: {
//                 id: user.id,
//             }
//         }
//         const AuthToken = jwt.sign(Payload, JWT_KEY);
//         success = true;
//         let AccountType = user.AccountType
//         res.json({ success, AuthToken, AccountType })

//     } catch (error) {
//         console.error(error)
//         res.status(500).send('error occured')
//     }
// })

router.put("/updateEarning/:token", async (req, res) => {
    const { token } = req.params; // Get the document ID from the URL
    const { Earning } = req.body; // Get the new IP from the request body

    try {
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id
        console.log(id)
        const UserFind = await User.findById(id); // Find the document by ID
        if (!UserFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        UserFind.Earning = Earning; // Add the new IP to the watchedIPs array
        await UserFind.save(); // Save the updated document

        return res.json(UserFind); // Return the updated document as the response
    } catch (error) {
        console.error('Error updating YouTube video', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

router.get("/getEarning/:token", async (req, res) => {
    const { token } = req.params; // Get the document ID from the URL

    try {
        const password = jwt.verify(token, JWT_KEY);
        const id = password.user.id;
        const UserFind = await User.findById(id); // Find the document by ID
        if (!UserFind) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(UserFind.Earning); // Return the updated document as the response
    } catch (error) {
        console.error('Error updating YouTube video', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})


module.exports = router