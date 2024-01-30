const express = require ('express');
const bodyParse = require ('body-parser');

const app = express();

app.use(bodyParse.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH , DELETE, OPTIONS");
    next();
})

app.post("/api/posts",(req, res, next)=>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message:"Post added successfully"
    })

})
app.get("/api/posts",(req,res,next) => {
        const posts = [ 
        {
        id:"fhsdoi23b",
        Title: "This is Shoaib here :)",
        Content:"Imm here to be a web Developer"
        },
        {
            id:"ncpdoiwe237fdc",
            Title: "This is a Dreamy Boy here :)",
            Content:"Imm here to be a Good web Developer"
        }

    ]

        res.status(200).json({
        message:'Post fetched successfully!',
        posts:posts
    })
});


module.exports = app;