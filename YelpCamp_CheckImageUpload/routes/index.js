var express = require('express');
var router = express.Router();
var passport = require('passport');

// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/')
//   },
//   filename: function (req, file, cb) {
//     // var fileExtension = file.originalname.split('.')[1] // get file extension from original file name
//     cb(null,req.body.username+".jpg");
//   }
// })
 
// var upload = multer({ storage: storage }) ;

var Campground = require('../models/campgrounds');
var User = require ('../models/user');


//landing page
router.get('/',function(req,res){
    res.render('landing');
});
//http://i.hmp.me/m/d5f49efe8d476a6661cb359d90c5d476.jpg

//INDEX
router.get("/campgrounds",function(req,res){
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,campgrounds){
        if(err) console.log(err) 
        else{
        res.render('campgrounds/index',{campgrounds:campgrounds});
        }
        });    
});


//-------------------
//Auth Routes
//-------------------
    router.get("/register",function(req,res){
                
        res.render("register"); 
        });
//handle signup logic
        router.post("/register",function(req,res){
        console.log("in here bro");
        console.log(req.body.username);
        // console.log(req.file);
        var newUser = new User(
            {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            dob: req.body.dob,
            batch: req.body.batch,
            studentnumber: req.body.studentnumber,
            facultynumber: req.body.facultynumber,
            department: req.body.department,
            phonenumber: req.body.phonenumber,
            photo: req.body.photo,
            isAdmin:false
            }
            
            
            );
        User.register(newUser,req.body.password,function(err,user){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                
                return res.render("register");
                }
                passport.authenticate("local")(req,res,function(){
                    req.flash("success", "Welcome to Bridge, " + user.username ); 
                    res.redirect("/campgrounds");
                    });
            });
        });
        
//Show Login Form And Authenticate
router.get("/login",function(req,res){
    res.render("login");
    });
    
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    }),function(req,res){
    res.send("Login");
    }); 
    
//Logout Route    
router.get("/logout",function(req,res){
    req.logout();
    req.flash("error","You have succesfully logged out!");
    res.redirect("/campgrounds");
    });        


    
module.exports = router;     