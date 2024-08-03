const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const withdrawSchema = new Schema({
  email:{
    type: String,
    unique:true
  },
  number: {
    type: String,
    required: true,
  },
  WithdrawAccount: {
      type: String,
      required : true,
  },
  Amount:{
      type:Number,
  },
  UserId:{
    type:String
  }
});

const Withdraw = mongoose.model("Withdraw", withdrawSchema);
module.exports= Withdraw;
