const express = require ('express');
const Routers = express.Router();
const Post = require ('../Models/post');
const multer = require ('multer');
const { count } = require('console');
const checkAuth = require('../middleware/check-auth');

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination : (req, file , cb) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, "BackEnd/images")
    },
    filename : (req, file, cb) =>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' +extension);
    }
})

Routers.post("",checkAuth, multer({storage:storage}).single("image") ,(req, res, next)=>{
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        Title : req.body.Title,
        Content : req.body.Content,
        imagePath : url + "/images/" + req.file.filename,
        creator : req.userData.userId
    });
    // console.log(post);
    post.save().then(createdPosts => {
        res.status(201).json({
            message:"Post added successfully",
            Post : {
                ...createdPosts,
                id : createdPosts._id,
                // ...createdPosts is actually the title content and images, this get the value of all the peoperties
                // Title : createdPosts.Title,
                // Content : createdPosts.Content,
                // imagePath : createdPosts.imagePath
            }
        });
        });

    // FXcEtwqodL5aQhio : pasword
    // devshoaib56
})

Routers.put("/:_id",checkAuth, multer({storage:storage}).single("image") , (req,res,next)=>{
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post ({
        _id : req.body._id,
        Title :req.body.Title,
        Content:req.body.Content,
        imagePath : imagePath
    })
   Post.updateOne({_id: req.params._id, creator : req.userData.userId}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
   }); 
});

Routers.get("",(req,res,next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const pageQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        pageQuery.skip(pageSize * (currentPage - 1)).limit(pageSize );
    }
        pageQuery.then(document => {
            fetchedPosts = document;
            return Post.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message:'Post fetched successfully!',
                posts:fetchedPosts,
                maxPosts : count
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
Routers.delete("/:_id",checkAuth, async(req,res,next) => {
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