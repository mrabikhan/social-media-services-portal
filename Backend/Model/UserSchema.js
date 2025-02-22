const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  AccountType: {
      type: String,
      enum: ["Buyer", "Worker"]
  },
  Earning:{
      type:Number,
      default:"0"
  }
});

const User = mongoose.model("User", userSchema);
module.exports= User;
