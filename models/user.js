var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
     username: String,
     password: String,
     firstname: String,
     lastname: String,
     studentnumber: String,
     facultynumber: String,
     batch: String,
     phonenumber:String,
     dob: String,
     department: String,
     // userPhoto: String,
     isAdmin: Boolean,
     isTreasurer:{type:Boolean,default:false} ,
       photo: String,
     society:{
          type : mongoose.Schema.Types.ObjectId,
          ref : "Campground" 
     }
     
     });
     
UserSchema.plugin(passportLocalMongoose);     
module.exports = mongoose.model("User",UserSchema);     