const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false; 
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; 
    } else {
      return true;
    }
  }
};


const commentValidators = [

  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

const VideoSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },

  slug:{
    type:String,
    required:true
  },

  embed:{
    type:String,
    required:true
  },

  image:{
    type:String
  },
  createdBy: { type: String ,default:"default"},
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  

  
  comments: [{
        commentby: { type: String },
        comment: { type: String, validate: commentValidators }
    
  }],

  Share: [{
        Request: { type: String },
        status: { type: Number,default: 2}
    
  }],

  Watch: [{
        user: { type: String },
        time: { type: Date,default:Date.now()},
        enable:{type:Number,default:0}
    
  }],


  

  staff:{type:Array}
  
/*
  comments:{
    type:Array,
  }

*/

});



const Video = module.exports = mongoose.model('Video',VideoSchema)



