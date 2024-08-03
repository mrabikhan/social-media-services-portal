const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const YoutubeSchema = new Schema({
    Title: {
      type: String,
    },
    Links: {
      type: String,
    },
    Quantity: {
      type: String,
    },
    Email:{
      type:String
    },
    Amount:{
      type:String
    },
    watchedIPs: [{
      type: String,
    }]
});

const Youtube = mongoose.model("Youtube", YoutubeSchema);
module.exports = Youtube;
