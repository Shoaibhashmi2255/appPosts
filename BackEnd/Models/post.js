const { default: mongoose } = require('mongoose');
const mongose = require('mongoose');



const postSchema = mongoose.Schema({
    Title : { type : String, required : true},
    Content : { type : String, required : true}
})

module.exports = mongoose.model('Post', postSchema);
