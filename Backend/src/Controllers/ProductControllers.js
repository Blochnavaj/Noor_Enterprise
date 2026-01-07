import { ProductModel } from "../Model/ProductModel.js"
import uploadToCloudinary from '../utils/uploadToCloudinary.js'



//function to add product => Admin panel
const AddProduct = async (req,res) => {
    try {
        const {name, rating, description, packs, categories, stock} = req.body;

        let imageUrls = []; 
   
        if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.buffer);
        imageUrls.push(url);
      }
    }
   
    const product = await ProductModel.create({
        name, 
        rating, 
        description,
        packs : packs ? JSON.parse(packs) : [],
        image: imageUrls,
        categories,
        stock
    });

    res.status(201).json({
        success : true,
        message : "Product added successfully",
        product
    });
      
    } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}



//function to Update product => Admin panel
const UpdateProduct = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

//function to List product => Admin panel
const ListProduct = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


//function to Delete product => admin panel 
const DeleteProduct = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


//function to single product => user frontend 
const SingleProduct = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


//function to ALL product => user frontend 
const AllProduct = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


export {AddProduct,DeleteProduct, UpdateProduct, AllProduct, SingleProduct, ListProduct};