const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
/*
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  SeenBy: { type: Array },

  history:[{

      Page:{type:String},
      view:{type:Date, default:Date.now()}

  }],
 
});

*/
const UserstatusSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  SeenBy: { type: Array },

  history:[{

      Page:{type:String},
      view:{type:Date, default:Date.now()}

  }],

  stories:[{
      Video:{type:String},
      view:{type:Date,default:Date.now()}
  }]
 
});

























const Usermodel = module.exports = mongoose.model('Usermodel', UserstatusSchema);

module.exports.getUserById = function(id, callback){
  Usermodel.findById(id, callback);
}


module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  Usermodel.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      //console.log(user.password)
      if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
