const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemId:{
        type: Number,
        required:true,
        unique:true
     },
    name: { 
        type: String,
        required: [true,'Item Name is Required'],
        trim:true
     },
     description: {
        type:String,
        required:[true, 'Discription is Reqired'],
        trim:true
    },
    price:{
        type:Number,
        required:[true, 'Price is Required'],
        min:[0, 'Price Cannot be in Negative']
     },
     quantity:{
        type:Number,
        required:[true, 'Quantity is Required'],
        min:[0, 'Quantity must be in Positive number']
     }
}, {timestamps:true}) 


const ITEM = mongoose.model('item',itemSchema)

module.exports = ITEM