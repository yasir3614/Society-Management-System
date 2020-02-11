var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');
var data = [
          {
               name: "Yasir",
               image: "https://peopledotcom.files.wordpress.com/2018/10/tristan-thompson2.jpg?crop=0px%2C0px%2C2418px%2C1613.0862533693px&resize=742%2C495",
               description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          },
          {
               name: "Imtiaz",
               image: "https://marketplace.canva.com/MABO32O0SeQ/1/thumbnail_large/canva-angry-man--MABO32O0SeQ.jpg",
               description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          },
          {
               name: "Poota",
               image: "https://couplestherapyinc.com/wp-content/uploads/2017/06/47505628_s.jpg",
               description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
          }
     ]

function seedDB(){
Campground.remove({},function(err,campground){
     if(err){
          console.log(err);
          }
          console.log("campgrounds removed"); 
          // //create campground
          // data.forEach(function(seed){
          // Campground.create(seed,function(err,campground){
          //      if(err) {
          //           console.log(err);
          //           }else{
          //                console.log("Added");   
          //                console.log(campground);
          // //add comment
          //      Comment.create(
          //           {
          //                text: "this place is great!",
          //                author: "Homer"
          //           },function(err,comment){
          //                if(err) {
          //                     console.log("error");
          //                     }else{
          //                 campground.comments.push(comment);
          //                 campground.save(); 
          //                 console.log("Created new comment");     
          //                 console.log(comment);
          //                     }    
          //                });
          //           }
          //      });
          // });
     });
     
}     
module.exports=seedDB;