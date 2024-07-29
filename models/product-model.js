const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

image: Buffer,
name:String,
price:Number,
discount : {
    type: Number,
    default: 0,
},
panelcolore : String,
bgcolor : String,
textcolore: String
});

module.exports = mongoose.model("product", productSchema );