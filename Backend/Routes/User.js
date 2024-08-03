const express = require("express");
const User = require("../Model/UserSchema")
const router = express.Router();
const fetchuser = require('../Middleware/FetchUser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_KEY = "ErnForView";

//Create a user 
router.post("/createuser", async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let email = await User.findOne({ email: req.body.email })
        if (email) {
            return res.status(404).json({ success, error: "this account already exist" })
        }

        const Salt = await bcrypt.genSalt(10);
        const SecPassword = await bcrypt.hash(req.body.password, Salt)
        const user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: SecPassword,
            AccountType: req.body.AccountType
        })

        const data = {
            user: {
                id: user.id,
            }
        }
        const AuthToken = jwt.sign(data, JWT_KEY);
        let AccountType = req.body.AccountType

        success = true;
        res.json({ success, AuthToken, AccountType })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured 53')
    }
})

// Login a user
router.post("/login", async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(email)

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ Message: "Account doesn't Fine" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!passwordCompare) {
            return res.status(400).json({ Message: "Account doesnt" })
        }

        const Payload = {
            user: {
                id: user.id,
            }
        }
        const AuthToken = jwt.sign(Payload, JWT_KEY);
        success = true;
        let AccountType = user.AccountType
        res.json({ success, AuthToken, AccountType })

    } catch (error) {
        console.error(error)
        res.status(500).send('error occured')
    }
})

router.put("/updateEarning/:token", async (req, res) => {
    const { token } = req.params; // Get the document ID from the URL
    const { Earning } = req.body; // Get the new IP from the request body

    try {
        const password = jwt.verify(token, JWT_KEY);
        const id =password.user.id
        console.log(id )
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
        const id =password.user.id;
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

// // get all
// router.post("/getuser",fetchuser,async(req, res)=>{
//     try {
//         User=req.body.id;
//     const user =await User.findById(userid).select("-password")
//     res.send(user);
//     } catch (error) {
//         console.error(error)
//             res.status(500).send('error occured')
//     }
// })

module.exports = router