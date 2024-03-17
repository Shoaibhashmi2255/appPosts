const mongose = require('mongoose');



const postSchema = mongose.Schema({
    Title : { type : String, required : true},
    Content : { type : String, required : true},
    imagePath : {type : String, required : true}
})

module.exports = mongose.model('Post', postSchema);
