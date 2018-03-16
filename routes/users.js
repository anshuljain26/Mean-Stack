const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/authentication');
var multer = require("multer");
var fs = require('fs');

const request = require('request');

var cron = require('node-cron');

const axios = require('axios');



cron.schedule('* * * * * *', function(){

  var val = 5*60*60*1000;
  
  User.find({},(err,user)=>{

   for(i=0;i<user.length;i++){

     var date = new Date()
     var current_time =Date.parse(date);

    for(j=0;j<user[i].history.length;j++){
        
        old_time  =Date.parse(user[i].history[j].view) + val;

        //console.log(old_time);
        //console.log(current_time)

        //console.log('.....');

        if(old_time <=current_time){

            user[i].history.splice(j,1);

            user[i].save((err,result)=>{

              if(err){

                //console.log("Problem in deletion");
              }

              else{
                //console.log("Successfully Deleted");
              }

            })

        }
    }

   }

  });

});

var app = express();

const Video = require('../models/user');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../models/chat');

server.listen(4000);


router.post('/register', (req, res, next) => {

    let user = new User({
      name:req.body.name,
      username:req.body.username,
      email:req.body.email,
      password:req.body.password
    })


  User.addUser(user,(err, user) => {
    //console.log(err)
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
  
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 3600 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  //console.log(req.user);
  res.json({user: req.user});
});

//views other user profile

router.get('/profile/info',(req,res,next)=>{
  //console.log(req.query.id);

  User.findOne({username:req.query.username}, (err, user)=>{

    var val=0;

    if(err){
      res.json({success:false,msg:"User not found"});
    }
    else{
      //console.log(user);
        //var comm = {"profile": req.query.username, "seenby": req.query.loggedinuser};

        for(i=0;i<user.SeenBy.length;i++){
          if(user.SeenBy[i]==req.query.loggedinuser){
              val=1;
              break;
          }
          if(val==1)
            break;

        }

        if(req.query.username == req.query.loggedinuser){
          val=2;
        }

        if(val==1){
          res.json({success:true,msg:"Entry is already there!!!",user:user});
        }

        else if(val==2){
          res.json({success:true,msg:"User is same",user:user});
        }

        else{

        user.SeenBy.push(req.query.loggedinuser);

        user.save((err,result)=>{
          if(err){
            res.json({success:true,msg:"Problem in save the data",user:user});
          }

          else{
            res.json({success:true,msg:"Save data",user:user});
          }
        })
      }
    }


  });




})

router.get('/listuser',(req,res,next)=>{

  //console.log('user');

    User.find({},(err,result)=>{
      //console.log(result);
      //console.log('ans');
      if(err){
        res.json(err);
      }
      else{
        res.json(result);
      }
    })
});

//Watch later Scheduling

cron.schedule('* * * * * *', function(){

  Video.find({},(err,result)=>{
      var date,current_time,present_time;
    for(i=0;i<result.length;i++){

      for(j=0;j<result[i].Watch.length;j++){
          date = new Date();
          current_time = Date.parse(date);
          present_time = Date.parse(result[i].Watch[j].time);
          //console.log(current_time);
          //console.log(present_time);


          if((current_time-present_time) >=0 && result[i].Watch[j].enable==0){
              result[i].Watch[j].enable = 1;
          }

          result[i].save((err,res)=>{
            if(err){
              //console,log(err);
            }
            else{
              //console.log("saved");
            }

          })
         
      }
    }

  })

});




router.post('/addVideo',(req,res,next)=>{
  //console.log(req.body)
   let video = new Video({
    name: req.body.name,
    slug: req.body.slug,
    image: req.body.image,
    embed: req.body.embed,
  });


   video.save((err,vid)=>{
    if(err){
      res.json({success:false, msg:"Video is not Successfully saved"});
    }
    else{
      //console.log(vid)
      res.json({success:true,msg:"Video is Successfully Saved"});
    }
   })

})

router.get('/videos',(req,res,next)=>{
  //console.log(req);
  //console.log(req.decoded.userId)
  Video.find(function(err,video){

      res.json(video);
    });

});

 router.delete('/videos/:id',(req,res,next)=>{

    Video.remove({_id:req.params.id},(err,result)=>{

      if(err){
        res.json({success:false,msg:"Something Went wrong"});
      }

      else{
        res.json({success:true,msg:"Video is Successfully deleted"});
      }
    });

 });


var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './angular-src/src/assets')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

 router.put('/edit/upload',upload.array("uploads[]", 12),(req,res,next)=>{
  //console.log(req.body)
  console.log(req.body.name);
  console.log(req.body.slug);
  
  Video.findByIdAndUpdate(req.body.id,{name:req.body.name,
                      slug:req.body.slug,
                      image:req.files[0].filename,
                      embed:req.files[1].filename},(err,result)=>{
                        if(err){
                          res.json({success:false,msg:"Not Updated"});
                        }
                        else{
                          res.json({success:true,msg:"Successfully Updated"});
                        }
                      });
                      
});




router.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  let video = new Video({
    name: req.body.name,
    slug: req.body.slug,
    image: req.files[0].filename,
    embed: req.files[1].filename,
    createdBy:req.body.createdBy,
  });
   video.save((err,vid)=>{
    if(err){
      res.json({success:false, msg:"Video is not Successfully saved"});
    }
    else{
      //console.log(vid)
      res.json({success:true,msg:"Video is Successfully Saved"});
    }
   })

});
var like;
router.post('/video/like',(req,res,next)=>{
 //console.log(req.body.username)
  Video.findOne({ _id: req.body.id },(err,result)=>{
    //console.log(result.likedBy)
    //console.log(req.body.username)
    if (result.likedBy.includes(req.body.username)) {
          res.json({ success: false, msg: 'You already liked this post.' }); 
                    }

    else{
      if (result.dislikedBy.includes(req.body.username)) {
          result.dislikes--;
          const arrayIndex = result.dislikedBy.indexOf(req.body.username);
          result.dislikedBy.splice(arrayIndex, 1);

          result.likedBy.push(req.body.username);
          result.likes++;
          result.save((err)=>{
            if(err){
                res.json({success:false, msg:"Error in liked the post"});
      }
             else{
              res.json({success:true,msg:"Successfully Liked the post"});
      }
         })
    }
    else{
      result.likedBy.push(req.body.username);
          result.likes++;
              result.save((err)=>{
            if(err){
                res.json({success:false, msg:"Error in liked the post"});
      }
             else{
              res.json({success:true,msg:"Successfully Liked the post"});
      }
         })
    }
    }              


  });
    });

var dislike;
router.post('/video/dislike',(req,res,next)=>{
 //console.log(req.body.username)
  Video.findOne({ _id: req.body.id },(err,result)=>{
    if (result.dislikedBy.includes(req.body.username)) {
          res.json({ success: false, msg: 'You already disliked this post.' }); 
                    }

    else{
      if (result.likedBy.includes(req.body.username)) {
          result.likes--;
          const arrayIndex = result.likedBy.indexOf(req.body.username);
          result.likedBy.splice(arrayIndex, 1);

          result.dislikedBy.push(req.body.username);
          result.dislikes++;
          result.save((err)=>{
            if(err){
                res.json({success:false, msg:"Error in disliked the post"});
      }
             else{
              res.json({success:true,msg:"Successfully disliked the post"});
      }
         })
    }
    else{
      result.dislikedBy.push(req.body.username);
          result.dislikes++;
              result.save((err)=>{
            if(err){
                res.json({success:false, msg:"Error in disliked the post"});
      }
             else{
              res.json({success:true,msg:"Successfully disliked the post"});
      }
         })
    }
    }              


  });
    });


router.post('/video/comment',(req,res,next)=>{
  //console.log(req.body)
  Video.findOne({_id:req.body.id},(err,result)=>{
    if(err){
      res.json({success:false,msg:"Video is not found"});
    }
    else{
      
      //console.log(result)
      
      var comm = {"commentby": req.body.email, "comment": req.body.comment};
      result.comments.push(comm);

      result.save((err,comment)=>{
        if(err){
          res.json({success:false,msg:"Something Went Wrong!!!!"});
        }
        else{
          res.json({success:true,msg:"Comment is Successfully Saved"});
        }


      })
      
    }

  })

})

/*
router.post('/find_location',(req,res,next)=>{


  var API_KEY = "api-key";

  var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    var address = req.body.location;

    var url = BASE_URL + address + "&key=" + API_KEY;


    request.get({url:url,json:true},(error, response, body)=>{

      res.json(response);

    });

 

    });
*/

router.post('/permission_request',(req,res,next)=>{

    //console.log(req);
    //res.json({success:true,msg:"ok"});
    
   Video.findOne({_id:req.body.id},(err,result)=>{
    var val=-1;
    if(err){
      res.json({success:false,msg:"Id is not found"});


    }
    else{

        for(i=0;i<result.Share.length;i++){
          if(result.Share[i].Request == req.body.email){
              if(result.Share[i].status == 1){
                val=1;
                break;
              }
              else if(result.Share[i].status == 2){
                val=2;
                break;
              }

              else if(result.Share[i].status == 0){
                val=0;
                break;
              }

          }
          if(val==1 ||  val==2 || val==0){
            break;
          }
        }

        if(val==1){
          res.json({success:false,msg:"Request is already Rejected"});
        }

        else if(val==2){
          res.json({success:false,msg:"Request is already submitted"});
        }

        else if(val==0){
          res.json({success:false,msg:"Request is already accepted"});
        }

        else{
           var comm = {"Request": req.body.email, "status":2};
            result.Share.push(comm);

            result.save((err,data)=>{
              if(err){
                res.json({success:false,msg:"Error in store the request"});
              }
              else{
                res.json({success:true,msg:"Request is Successfully submitted"});
              }
            })

        }
    }



   });
   
});



router.post('/permission_status',(req,res,next)=>{
	//console.log(req.body);

  Video.findOne({_id:req.body.id},(err,result)=>{

    var val =0;

    if(err){
      res.json({success:false,msg:"Id not found"});
    }

    else{

      for(i=0;i<result.Share.length;i++){

          if(result.Share[i].Request == req.body.em && result.Share[i].status == 0){
            val=0;
            break;

          }

          else if(result.Share[i].Request == req.body.em && result.Share[i].status == 1){
            val=1;
            break;
          }
          else if(result.Share[i].Request == req.body.em && result.Share[i].status == 2){

            result.Share[i].status = req.body.val;
            result.staff.push(result.Share[i].Request);
            val=2;
            break;
          }
      }


      if(val==0){
        res.json({success:false,msg:"Your request has already been accepted"});
      }

      else if(val==1){
        res.json({success:false,msg:"Your request has already been Rejected"});
      }

      else{
        result.save((err,data)=>{
          if(err){
            res.json({success:false,msg:"Error occured"});
          }
          else{
            if(req.body.val==0){
              res.json({success:true,msg:"Your requested is being accepted"});
            }
            else{
              res.json({success:false,msg:"Your requested is being Rejected"});
            }
          }

        })
      }



    }

  })


})
// Chat section

io.on('connection', function (socket) {
  //console.log('User connected');
  socket.on('disconnect', function() {
    //console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    //console.log(data);
    io.emit('new-message', { message: data });
  });
});

/* GET ALL CHATS */
router.get('/chat/:room', function(req, res, next) {
  //console.log("anshu");
  Chat.find({ room: req.params.room }, function (err, chats) {
    if (err) return next(err);
    //console.log("ansu");
    res.json(chats);
  });
});

/* SAVE CHAT */
router.post('/chat', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



router.put('/chat/:id', function(req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CHAT */
router.delete('/chat/:id', function(req, res, next) {
  //console.log(req.params)
  //console.log(req.body);

  Chat.find({room:req.params.id},(err,result)=>{
    for(i=0;i<result.length;i++){
      //console.log(result[i]._id);
      Chat.remove({_id:result[i]._id},(err,res)=>{
      })
    }

    if(err){
      res.json({success:false,msg:"Room is not there in the database"});
    }

    else{
      res.json({success:true,msg:"Successfully deleted the enteries"});
    }

  })
  
});



/* Reedit-Search */


router.post('/redit-Search',(req,res,next)=>{

  var url = `http://www.reddit.com/search.json?q=${req.body.search}&sort=${req.body.sortby}&limit=${req.body.limit}`;

  request.get({url:url,json:true},(error, response, body)=>{
      res.json(response);

    });
});



/* Maintain user-history */

router.post('/history',(req,res,next)=>{
    var hist = 0;

    //console.log(req.body);

    User.findOne({email:req.body.email},(err,result)=>{

      if(err){

        res.json({success:false,msg:"Email is not found...."});
      }


      for(i=0;i<result.history.length;i++){
          //console.log(result.history[i].Page);
          if(result.history[i].Page){
        if(result.history[i].Page == req.body.slug){
              var hist = 1;
              break;
        }
      }

      }

      if(hist==1){
        res.json({success:false,msg:"Page is already exists..."});
      }

      else{

        var his = {"Page": req.body.slug, "View": Date.now()};
          result.history.push(his);

       result.save((err,history_save)=>{

          if(err){

            res.json({success:false,msg:"Data is not saved"});
          }

          else{
            res.json({success:false,msg:"Successfully saved"});
          }


       })   

      }


    })

});




router.post('/record', upload.array("uploads[]", 12),(req,res,next)=>{
  //console.log(req.body.email);
  path = '/home/anshul/Downloads/' + req.body.src;
  newpath = './angular-src/src/assets/file/'+req.body.src;
  User.findOne({email:req.body.email},(err,result)=>{


    
    
    fs.rename(path,newpath,function(err){
        if(err){
          //res.json({success:false,msg:"Problem in Relocate"});
          console.log(err);
        }
        else{
          console.log('Successfully Relocate');
        }
    });

    var st = {"Video": req.body.src, "View": Date.now()};
    result.stories.push(st);

    //result.story.push(req.body.src);
    result.save((err,response)=>{
      if(err){
        res.json({success:false,msg:"Problem in saving the data"});
      }
      else{
        res.json({success:true,msg:"Successfully saved"});
      }
    })

  })


});


router.post('/watchlater',(req,res,next)=>{
  
  Video.findOne({slug:req.body.slug},(err,result)=>{
    var hist = 0;

    for(i=0;i<result.Watch.length;i++){
      if(result.Watch[i].user == req.body.email){
          var hist = 1;
          break;
      }
    }
    if(hist==1){
      res.json({success:false,msg:"Already set"});
    }

    else{
      var wat = {"user":req.body.email,time:req.body.time,"enable":0};

      result.Watch.push(wat);

      result.save((err,response)=>{
        if(err){
          res.json({success:false,msg:"Problem Occured"});
        }
        else{
          res.json({success:true,msg:"Successfully set"});

        }
      });
    }
  

  });

});


router.post('/removeWatch',(req,res,next)=>{
  //console.log(req.body);
  Video.findOne({slug:req.body.slug},(err,result)=>{
      var flag=0;
      //console.log(result);
      if(err){
        res.json({success:false,msg:"Video is not found"});
      }
      else{
        for(i=0;i<result.Watch.length;i++){
          if(result.Watch[i].user == req.body.email){
            if(result.Watch[i].enable ==1){
              result.Watch.splice(i,1);
              flag=1;
              break;
            }
          }
        }
        if(flag==1){
          result.save((err,response)=>{
              if(err){
                res.json({success:false,msg:"Entry not saved"});
              }
              else{
                res.json({success:true,msg:"Successfully Done"});
              }
          })
        }

      }
      if(flag==0){
        res.json({success:true,msg:"Not saved!!!"});
      }

  });
})



module.exports = router;
