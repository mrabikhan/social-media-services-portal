const connectToMongo = require("./DB.js");
const express = require('express')
var cors = require('cors')
const nodemailer = require('nodemailer');

connectToMongo()

const app = express()
const port = 5000
app.use(express.json())


app.use(cors())

app.use('/api/user', require('./Routes/User'));

app.use('/api/Service', require('./Routes/Youtube'));

app.use('/api/Withdraw', require('./Routes/Withdraw'));

app.post('/send-email', (req, res) => {
  const { title, name,  Email, PhoneNu, Message, MeetingType, videoApp, TourTime, TourDate} = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sohaibshoukat94@gmail.com', // generated ethereal user
      pass: 'wykgmnowgsxjvrtu', // generated ethereal password
    },
  });

  // Define the email options
  const mailOptions = {
    from: Email,
    to: 'sohaibshoukat94@gmail.com',
    subject: `Meeting Schedule For ${title}`,
    text: `Dear Real Estate,

    I hope this email finds you well. I am writing to schedule a meeting for ${title}. Please find the details below:

    - Name: ${name}
    - Meeting Type: ${MeetingType} 
    ${MeetingType?`-Video Chat App: ${videoApp}`:''}
    - Email: ${Email}
    - Phone No: ${PhoneNu}
    - Preferred Date: ${TourDate}
    - Preferred Time: ${TourTime}

    ${Message ? `Additional Note: ${Message}` : ''}

    Looking forward to your confirmation and further instructions.

    Best regards,
    ${name}`,
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

