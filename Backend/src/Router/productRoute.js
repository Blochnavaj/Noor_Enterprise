import express from 'express';
import {AddProduct,DeleteProduct, UpdateProduct, AllProduct, SingleProduct, ListProduct} from '../Controllers/ProductControllers.js'
import upload from '../Middleware/multer.js';



const router = express.Router();

/* Admin */
router.post(
  "/add",
  upload.array("image", 5),
  AddProduct
);

router.put(
  "/update/:id",
  upload.array("image", 5),
   UpdateProduct
);

router.get("/list",  ListProduct);
router.delete("/delete/:id",  DeleteProduct);

/* User */
router.get("/single/:id", SingleProduct);
router.get("/all",  AllProduct);



export default router;