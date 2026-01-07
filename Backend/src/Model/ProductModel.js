import mongoose from "mongoose";



const packSchema = new mongoose.Schema({
    size : {
        type : String,
        required : true
    },
    mrp : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    discountPercent : {
        type : Number, 
        default : 0
    }

}, { _id : false});

const ProductSchema = new mongoose.Schema({
     name : {
        type : String,
        required : true,
        trim : true
     },
     image : [{type : String}],  // storage of image in cloundiary 
     rating : {
        type : String,
        default : 0
     },
     description : {
        type : String,
     },
     packs : [{type : packSchema, default : []}],
     categories : {
        type : String,
        required : true
     },
     stock : {
        type : Number,
        default : 0
     },
     createdBy : {
       type : mongoose.Schema.Types.ObjectId, ref: "user",
     }


},{timestamps : true})

export const ProductModel = mongoose.model('product', ProductSchema);