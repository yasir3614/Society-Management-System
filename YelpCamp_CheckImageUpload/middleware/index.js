
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = function checkCampgroundOwnerShip(req,res,next){
    if(req.isAuthenticated()){
             Campground.findById(req.params.id,function(err,foundCampground){        
        if(err){
            res.redirect("back");
            }else{
                //does user own campground?
                if(foundCampground.author.id.equals(req.user.id)){ 
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
        
        }else{
           res.redirect("back");
            
            }
    }

middlewareObj.checkCommentOwnerShip = function checkCommentOwnerShip(req,res,next){
    if(req.isAuthenticated()){
             Comment.findById(req.params.comment_id,function(err,foundComment){        
        if(err){
            req.flash("error","Campground Not Found");
            res.redirect("back");
            }else{
                //does user own coment?
                if(foundComment.author.id.equals(req.user.id)){ 
                    next();
                }else{
                    req.flash("You dont have permissions to do that!");
                    res.redirect("back");
                }
            }
        });
        
        }else{
           req.flash("error","Please Login First!");
           res.redirect("back");
            
            }
    }
    

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
        }
        req.flash("error","Please Log In First");
        res.redirect("/login");
    }
module.exports = middlewareObj;