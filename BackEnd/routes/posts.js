const express = require ('express');
const Routers = express.Router();
const Post = require ('../Models/post');


Routers.post("",(req, res, next)=>{
    const post = new Post({
        Title : req.body.Title,
        Content : req.body.Content
    });
    // console.log(post);
    post.save().then(createdPosts => {
        res.status(201).json({
            message:"Post added successfully",
            PostId: createdPosts._id,
        });
        });

    // FXcEtwqodL5aQhio : pasword
    // devshoaib56
})

Routers.put("/:_id", (req,res,next)=>{
    const post = new Post ({
        _id : req.body._id,
        Title :req.body.Title,
        Content:req.body.Content
    })
   Post.updateOne({_id: req.params._id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
   }); 
});

Routers.get("",(req,res,next) => {
        Post.find().then(document => {
            res.status(200).json({
                message:'Post fetched successfully!',
                posts:document
            });
        });            
}); 

Routers.get("/:_id", (req,res,next) =>{
    Post.findById(req.params._id).then(post => {
        if (post) {
            res.status(200).json(post);
        }else{
            res.status(404).json({message:  'Post Not Found'})
        }
    })
})
Routers.delete("/:_id", async(req,res,next) => {
    console.log(req.params._id);
    await Post.deleteOne ({_id: req.params._id}).then(createdPosts =>{
        if(createdPosts.deletedCount > 0){
            res.status(200).json({message:'Post deleted!!'});
        }else{
            res.status(500).json({message:'Post Not deleted!!'});
        }
    });
});

module.exports = Routers;