var express = require('express');
var app = express();
var methodOverride = require('method-override'); 
app.use(methodOverride("_method"));
var bodyP=require('body-parser');
var mongoose= require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");
var User = require("./models/user");
var seedDB = require("./seeds");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var middleware = require("./middleware");

var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");


// seedDB(); //seed database from here 
mongoose.connect("mongodb://localhost/yelpcamp");
app.use('/uploads', express.static('uploads'));
app.use(flash() );
app.use(bodyP.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));

 

//PASSPORT CONFIGURATION
app.use(require('express-session')({
secret:"My Lovely Cat",
resave: false,
saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Function to use currentUser on everypage otherwise undefined user pops up
app.use(function(req,res,next){
res.locals.currentUser = req.user;
res.locals.error = req.flash("error");
res.locals.success = req.flash("success");

next();
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


//SHOW PROFILE
app.get("/:username/profile",middleware.isLoggedIn,function(req,res){
var myuser = req.params.username;
// res.render("profile/myprofile");
// console.log(req.user);
console.log(myuser);
User.findOne({username:myuser},function(err,foundUser){
if(err){ 
res.redirect("/");
}else{
Campground.findById(foundUser.society,function(err, foundSociety) {
if(err)console.log(err);
res.render("profile/myprofile",{user:{foundUser,foundSociety}});


})
console.log("Found User = " + foundUser);
}
});
});

//EDIT PROFILE

app.get("/profile/:id/edit",middleware.isLoggedIn, function(req,res){
User.findById(req.params.id,function(err,foundUser){ 
//does user own campground? via middleware
if(err){ 
res.redirect("/campgrounds");
}else{
res.render("profile/edit",{user: foundUser});
} 
});
});

//UPDATE PROFILE
app.put("/profile/:id",middleware.isLoggedIn,function(req,res){

User.findByIdAndUpdate(req.params.id,req.body.user,function(err,updatedUser){
if(err){
res.redirect("/campgrounds");
} else {
req.flash("success","User Updated Succesfully."); 
res.redirect("/profile"); 


} 
});

});



//-------------------
//Server Running Here
//-------------------

app.get('*', function(req, res) {
res.redirect('/');
});

app.listen(3000,process.env.IP,function(){ 
console.log("Running");

});