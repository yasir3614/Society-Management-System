var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    checkfunds: Number,
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
            },
        username: String 
        },
    comments:[
        {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Comment" 
        }
    ],
    department: String,
    
    treasurer: {
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    },
    
       
    user:[{
        
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],


    funds:{

        remainingFunds:{type: Number,default:0},
        newfund: [{
            fund:  Number,           
            reason: String,
            typeOfTransaction: String,
            modified: {type:Date,default:Date.now}

        }]

    }
    });


module.exports = mongoose.model("Campground",campgroundSchema);