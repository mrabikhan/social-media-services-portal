const express = require("express");
const Youtube = require("../Model/YoutubeSchema");
const router = express.Router();
// const fetchuser = require('../midelware/Fetchuser');
const User = require("../Model/UserSchema")
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const JWT_KEY = "ErnForView";

//Get All notes of the user
router.get('/FetchWatchServices', async (req, res) => {
  try {
    const counts = await Youtube.find();

    let videoLinks = [];
    for (let i = 0; i < counts.length; i++) {
      if (counts[i].Title === 'WatchTime' || counts[i].Title === 'ViewCount') {
        videoLinks.push(counts[i]);
      }
    }

    res.json(videoLinks);
  } catch (error) {
    console.error(error);
    res.status(500).send('network error occurred');
  }
});


//Get All notes of the user
router.get('/FetchServices', async (req, res) => {
  try {
    const Services = await Youtube.find();
    res.json(Services);
  } catch (error) {
    console.error(error);
    res.status(500).send('network error occurred');
  }
});


router.get("/FetchSubscriberServices", async (req, res) => {
  try {
    const counts = await Youtube.find();

    let SubScriber = [];
    for (let i = 0; i < counts.length; i++) {
      if (counts[i].Title === 'Subscriber') {
        SubScriber.push(counts[i]);
      }
    }

    res.json(SubScriber);
  } catch (error) {
    console.error(error)
    res.status(500).send('network error occured')
  }

})

router.get("/FetchViewServices", async (req, res) => {
  try {
    const counts = await Youtube.find();

    let SubScriber = [];
    for (let i = 0; i < counts.length; i++) {
      if (counts[i].Title === 'ViewCount') {
        SubScriber.push(counts[i]);
      }
    }

    res.json(SubScriber);
  } catch (error) {
    console.error(error)
    res.status(500).send('network error occured')
  }

})

router.get("/FetchWatchTimeServices", async (req, res) => {
  try {
    const counts = await Youtube.find();

    let SubScriber = [];
    for (let i = 0; i < counts.length; i++) {
      if (counts[i].Title === 'WatchTime') {
        SubScriber.push(counts[i]);
      }
    }

    res.json(SubScriber);
  } catch (error) {
    console.error(error)
    res.status(500).send('network error occured')
  }

})

//Store new notes
router.post("/AddService", async (req, res) => {
  const {token}=req.body
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const password = jwt.verify(token, JWT_KEY);
    const id = password.user.id;
    const UserFind = await User.findById(id); // Find the document by ID
    if (!UserFind) {
      return res.status(404).json({ message: 'User not found' });
    }

    const Service = new Youtube({
      Title: req.body.Title,
      Links: req.body.Links,
      Quantity: req.body.Quantity,
      Amount:req.body.Amount,
      Email:UserFind.email
    })
    const ServiceSaved = await Service.save()

    res.json(ServiceSaved)

  } catch (error) {
    console.error(error)
    res.status(505).send('error occured')
  }

})

router.delete("/ServiceDeny/:id", async (req, res) => {
  try {

      let service = await Youtube.findById(req.params.id);
      if (!service) {
          return res.status(404).send("Not Found")
      }

      service = await Youtube.findByIdAndDelete(req.params.id)
      res.json("Successfull deleted")

  } catch (error) {
      console.error(error)
      res.status(500).send('error occured')
  }

})


router.put("/updateToken/:id", async (req, res) => {
  const { id } = req.params; // Get the document ID from the URL
  const { watchedIP } = req.body; // Get the new IP from the request body

  try {
    const youtube = await Youtube.findById(id); // Find the document by ID
    if (!youtube) {
      return res.status(404).json({ message: 'YouTube video not found' });
    }

    youtube.watchedIPs.push(watchedIP); // Add the new IP to the watchedIPs array
    await youtube.save(); // Save the updated document

    return res.json(youtube); // Return the updated document as the response
  } catch (error) {
    console.error('Error updating YouTube video', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

})


// Get All notes of the user
router.delete("/DeleteService/:id", async (req, res) => {
  try {

    let sub = await Youtube.findById(req.params.id);
    if (!sub) {
      return res.status(404).send("Not Found")
    }

    sub = await Youtube.findByIdAndDelete(req.params.id)
    res.json("Successfull node deleted")

  } catch (error) {
    console.error(error)
    res.status(500).send('error occured')
  }

})

router.delete("/DeleteSubService", async (req, res) => {
  try {
    // Find all services with the title "Subscriber"
    const subscribers = await Youtube.find({ Title: "Subscriber" });

    if (subscribers.length === 0) {
      return res.status(404).send("No subscriber services found");
    }

    // Delete all subscriber services
    await Youtube.deleteMany({ Title: "Subscriber" });

    res.json("All subscriber services successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while deleting subscriber services");
  }
});


router.delete("/DeleteWatchService", async (req, res) => {
  try {
    // Find all services with the title "Subscriber"
    const subscribers = await Youtube.find({ Title: "WatchTime" });

    if (subscribers.length === 0) {
      return res.status(404).send("No Watch Time services found");
    }

    // Delete all subscriber services
    await Youtube.deleteMany({ Title: "WatchTime" });

    res.json("All Watch Time services successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while deleting Watch Time services");
  }
});



router.delete("/DeleteViewService", async (req, res) => {
  try {
    // Find all services with the title "Subscriber"
    const subscribers = await Youtube.find({ Title: "ViewCount" });

    if (subscribers.length === 0) {
      return res.status(404).send("No View Count services found");
    }

    // Delete all subscriber services
    await Youtube.deleteMany({ Title: "ViewCount" });

    res.json("All View Count services successfully deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while deleting View Count services");
  }
});


module.exports = router