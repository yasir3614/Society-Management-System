var express = require('express');
var router = express.Router({mergeParams: true});

var Campground = require('../models/campgrounds');
var Comment    = require('../models/comments');

var middleware = require("../middleware");
//------------------
//Comment Routes
//------------------

router.get("/new",middleware.isLoggedIn,function(req,res){
    //find camphround by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            }else{
                res.render("comments/new",{campground:campground});
            }
        });
    });


router.post("/",middleware.isLoggedIn,function(req,res){
    //look up campground using id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){    
                    console.log(err);
                    console.log("Error FOUND");
                    }else{
                         //add username id to comment then save
                         comment.author.id = req.user._id;
                         comment.author.username = req.user.username;
                         comment.save();
                         campground.comments.push(comment);
                         campground.save();  
                         res.redirect("/campgrounds/"+campground._id);
            
                        }
                });
            }
        });
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
    
    });

//EDIT COMMENT
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
    // req.params.id
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
            }else{
                res.render("comments/edit",{campground_id: req.params.id,comment: foundComment});     
    
                }
        });
    });    
    
 
//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
    
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateCommment){
        if(err){
            res.redirect("back");
            }else{
                res.redirect("/campgrounds/"+req.params.id);
                }
    });
   
});

//COMMENT DELETE
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
            }else{
             res.redirect("/campgrounds/"+req.params.id);
            }
        })
    });
 
 
   
  //Check if user is logged in or logged out        


//check for comment
    

 module.exports = router;   