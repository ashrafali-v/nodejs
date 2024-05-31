const mongoose = require("mongoose");
const User = require("./User");
const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author:{
    type: mongoose.Types.ObjectId,
    ref:'User'
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  }

});

module.exports = mongoose.model('Post', postSchema)