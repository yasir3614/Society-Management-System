var express = require('express');
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
var User = require ('../models/user');
//NEW
router.get('/new',middleware.isLoggedIn,function(req,res){
    if(req.user.isAdmin == true){
    res.render('campgrounds/new');
    console.log(req.user);
    }else{
            req.flash("error","You are not authorized to add a society...redirecting");
            res.redirect("/campgrounds");
        }
});


//Show Admin panel
router.get("/:id/adminpanel",middleware.isLoggedIn,function(req,res){
    
    var campgroundId = req.params.id;
    var id = req.params.id;
    console.log(campgroundId);
     
    console.log("we have been thru here");
    User.find({},function(err,users){
        if(err) console.log(err) 
        else{
            
        Campground.findById(id).populate("user").exec(function(err,reguser){
            if(err) console.log(err)
            
            console.log(reguser);
            res.render("campgrounds/adminpanel",{parm:{users,id,reguser}});
            });
            
        }
        });    
});

//grant adminship
router.post("/adminpanel/:id/grant",function(req,res){
    console.log(req.body.username);
    User.findOneAndUpdate({username:req.body.username},{ $set : { "isAdmin" : true } },function(err,foundUser){
        if(err){
            res.send(err);
            }else{
                console.log(foundUser);
                req.flash(req.body.username + " : access granted");
                res.redirect("/campgrounds");
                }
        });
    });


//revoke adminship
router.post("/adminpanel/:id/revoke",function(req,res){
    console.log(req.body.username);
    User.findOneAndUpdate({username:req.body.username},{ $set : { "isAdmin" : false } },function(err,foundUser){
        if(err){
            res.send(err);
            }else{
                console.log(foundUser);
                req.flash(req.body.username + " : access granted");
                res.redirect("/campgrounds");
                }
        });
    });
    
    
//delete user
router.delete("/adminpanel/:id/delete",function(req,res){
    console.log(req.body.username);
    var myuser = req.body.username;
    User.findOneAndRemove({username: myuser},function(err){
        if(err){
            res.send(err);
            }else{
                //console.log(foundUser);
                req.flash(req.body.username + " : user deleted");
                res.redirect("/campgrounds/"+req.params.id+"/adminpanel");
                }
        });
    });

//add user to society
router.post("/adminpanel/:id/addusertosociety",function(req,res){
    console.log(req.body.username);
    
    var username = req.body.username;
    var societyId = req.params.id;
    
    //Username Find
    //Username -> society -> id = societyId 
    
    User.findOneAndUpdate({username:req.body.username},{society:societyId },function(err,foundUser){
        if(err){
            res.send(err);
            }else{
                console.log(foundUser);
               
                Campground.findById(societyId,function(err, foundCampground) {
                   if(err)console.log(err)
                   else
                   {
                       
                       foundCampground.user.push(foundUser);
                       foundCampground.save();
                       
                   }
                });
                req.flash(req.body.username + " added to society");
                res.redirect("/campgrounds");
                }
        });
    });    


// //add treasurer to society
// router.post("/adminpanel/:id/addtreasurertosociety",function(req,res){
//     console.log(req.body.username);
    
//     var username = req.body.username;
//     var societyId = req.params.id;
    
//     console.log("1");
//     User.find({"username":username},function(err,foundUser){
//       console.log("2");
//       if(err) {console.log(err);
//       }
//       else{
         
//  var found=0;
//           Campground.find({user : { $elemMatch:{"user._id":{foundUser}}}},function(err, foundSociety) {
//               if(err){
//                   console.log(err);
//                   }else{
                      
//                           Campground.findByIdAndUpdate(societyId,{treasurer:foundUser},function(err, updatedCampground) {
//                               if(err) {console.log(err)}
//                               else{
//                                     User.findOneAndUpdate({username:req.body.username},{ $set : { "isTreasurer" : true } },function(err,foundUser){
//                                     if(err){
//                                         res.send(err);
//                                         }
//                                     });
//                                   res.redirect("/campgrounds/"+req.params.id+"/adminpanel");
//                                   }
//                             });
//                       }
//           });
//       }          
//     });
// });        
        

//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
     if(req.user.isAdmin == true){
    var name =       req.body.name;
    var image=       req.body.img;
    var description= req.body.description;
    
    var author = {
        id : req.user._id,
        username : req.user.username 
        }
        
    
    var newCampground = {name: name,image: image,description: description, author: author};
    
    Campground.create(newCampground,function(err,campground){
        
        if(err) console.log(err)
        else{
            
            console.log("added to database");
            console.log(campground);
            req.flash("success","Society Added Succesfully."); 
            res.redirect("/campgrounds");
            }
        });
    }else{
            req.flash("error","You are not authorized to add a society...redirecting");
            res.redirect("/campgrounds");
        }
});

//SHOW
router.get("/:id",function(req,res){
//   res.render("show"); 
   Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) {console.log(err)
        }else{
            console.log(foundCampground);
        res.render("campgrounds/show",{campground: foundCampground});    
        }
       });
});

//EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnerShip, function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){        
        //does user own campground? via middleware
        if(err){    
            res.redirect("/campgrounds");
            }else{
        res.render("campgrounds/edit",{campground: foundCampground});
            }        
    });
});

//UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
            } else {
            req.flash("success","Campground Updated Succesfully.");     
            res.redirect("/campgrounds/"+req.params.id);        
            }       
        });
    
    });


//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnerShip,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log("error while deleting");
            }else{
                req.flash("success","Campground Deleted Succesfully."); 
                res.redirect("/campgrounds");
                }    
            
        })
    });


//Check if user is logged in or logged out        

    
module.exports = router;
