const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://farooqafzal:Ern4Views@cluster0.xpzev9d.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('connected to mongoose');
  } catch (error) {
    console.log(error.message);
    console.log("not connected")
  }
};

module.exports = connectToMongo;


