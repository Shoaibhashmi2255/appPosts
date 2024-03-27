const express = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require ('../Models/user');
const router = express.Router();

router.post('/signup' ,(req,res,next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User ({
            email : req.body.email,
            password : hash
        });
        console.log(user);
        user.save().then(result => {
            res.status(201).json({
                message : 'User Created!',
                result : result
            });
            console.log(result);

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    });  
});


// router.post('/signup', (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(result => {
//                     console.log(result);
//                     res.status(201).json({
//                         message: 'User Created!',
//                         result: result
//                     });
//                 })
//                 .catch(err => {
//                     console.error("Error saving user:", err);
//                     res.status(500).json({
//                         error: err.message // Send error message in response
//                     });
//                 });
//         })
//         .catch(hashErr => {
//             console.error("Error hashing password:", hashErr);
//             res.status(500).json({
//                 error: hashErr.message // Send error message in response
//             });
//         });
// });


router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({email : req.body.email}).then(user => {
        if (!user) {
            return res.status(401).json({
                message : 'Auth Failed!'
            });
        };
        fetchedUser = user;
       return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message : 'Auth Failed!'
            });
        }
        const token = jwt.sign({email :fetchedUser.email, userId : fetchedUser._id}, 'secret_this_should_be_longer', {expiresIn: "1h"});
        res.status(200).json({
            token:token,
            expiresIn : 3600
        })
    }).catch(err => {
        return res.status(401).json({
            message : 'Auth Failed!'
        });
    })
});


module.exports = router;