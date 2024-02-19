const express = require ('express');
const bodyParse = require ('body-parser');
const mongose = require ('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());

// j8PglZRekaLmzvgJ 
mongose.connect("mongodb+srv://shoaibzafar2255:j8PglZRekaLmzvgJ@cluster0.idojyvv.mongodb.net/")
.then(() => {
    console.log('Connected To Database!')
})
.catch((es) => { 
    console.log('Connection Failed',es);
});

const Post = require ('./Models/post');
const { connect } = require('http2');

app.use(bodyParse.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH , DELETE, OPTIONS");
//     next();
// })
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    next();
  });
app.post("/api/posts",(req, res, next)=>{
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

app.get("/api/posts",(req,res,next) => {
        Post.find().then(document => {
            res.status(200).json({
                message:'Post fetched successfully!',
                posts:document
            });
        });            
}); 
app.delete("/api/posts/:_id", async(req,res,next) => {
    console.log(req.params._id);
    await Post.deleteOne ({_id: req.params._id}).then(createdPosts =>{
        if(createdPosts.deletedCount > 0){
            res.status(200).json({message:'Post deleted!!'});
        }else{
            res.status(500).json({message:'Post Not deleted!!'});
        }
    });
});
module.exports = app;