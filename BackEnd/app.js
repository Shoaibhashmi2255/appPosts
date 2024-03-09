const express = require ('express');
const bodyParse = require ('body-parser');
const mongose = require ('mongoose');
const app = express();
const postsRoutes = require ('./routes/posts');
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

  app.use("/api/posts" , postsRoutes);
module.exports = app;
