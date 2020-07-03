//create test posts

var mongoose = require("mongoose");
var Post = require("./models/post");

var data = [
    {
        title: "Cloud's Rest",
        image: "https://www.dirtinmyshoes.com/wp-content/uploads/2016/02/Zion-2015-Watchman-Campground-6-e1550988401514.jpg",
        body:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        title: "Nocc Falls",
        image: "https://images.squarespace-cdn.com/content/v1/574f0825859fd01f18ec55cc/1540325315332-E3QKCFEHYOUF0QG8FCN3/ke17ZwdGBToddI8pDm48kFWxnDtCdRm2WA9rXcwtIYR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UcTSrQkGwCGRqSxozz07hWZrYGYYH8sg4qn8Lpf9k1pYMHPsat2_S1jaQY3SwdyaXg/NFP_Campground_A80U1788.jpg",
        body:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        title: "Aurora Bay",
        image: "https://www.hurtigruten.com/globalassets/photos/inspiration/northern-lights/hub/aurora-borealis-above-snowy-island-vestvagoya-lofoten_swen-stroop.jpg?width=1900&height=950&center=0.51,0.34&transform=DownResizeCrop",
        body:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]

function seedDB(){
    //Remove all posts
    Post.deleteMany({}, function(err){
       if(err){
         console.log(err);
     }else{
        console.log("removed posts");
     }
    });
     //add a few posts
     data.forEach(function(seed){ //loop over items in data array
        Post.create(seed, function(err, post){ //create a campground
            if(err){
                console.log(err);
            }else{
                console.log("Added a post");
                //create a comment
                /*Comment.create( //create a comment for each post
                    {
                        text:"Great place 10/10!",
                        author:"Bob"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });*/
            }
        });
     });
    //});
}

module.exports = seedDB; //export function