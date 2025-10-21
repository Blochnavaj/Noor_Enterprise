 import React, { useState } from "react";
import { CheckCircle, Leaf, Droplet, Heart, Shield, ShoppingBag } from "lucide-react";
import {assets} from "../../assets/assets.js";
import { toast } from "sonner";
import NewArrivalSection from "./NewArrivalSection";

function ProductDetails() {
  const productVariants = [
    {
      id: 1,
      weight: "100g",
      price: 150,
      mrp: 200,
      images: [assets.product1, assets.product2, assets.product3],
    },
    {
      id: 2,
      weight: "500g",
      price: 550,
      mrp: 700,
      images: [assets.product4, assets.product5, assets.product6],
    },
    {
      id: 3,
      weight: "1kg",
      price: 950,
      mrp: 1200,
      images: [assets.product2, assets.product3, assets.product5],
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(productVariants[0]);
  const [mainImage, setMainImage] = useState(selectedVariant.images[0]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.images[0]);
  };


  const handleAddToCart = () => {
    if(!selectedVariant) {
      toast.error("Please select a product size first!" , {
         duration : 1000
      });
      return;
    }
    toast.success("Product add to Cart " , {
      duration : 1000
    })

    setIsDisabled(true);

    setTimeout(() =>  {
     setIsDisabled(false)
  } , 1000)
  }


  return (
    <>
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side: Product Images */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
        <div className="flex md:flex-col gap-3 md:h-[400px] overflow-x-auto md:overflow-y-auto scrollbar-hide md:pr-2">
          {selectedVariant.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl cursor-pointer border-2 ${
                mainImage === img ? "border-green-500" : "border-transparent"
              } hover:scale-105 transition-transform duration-200`}
            />
          ))}
        </div>

        {/* Main Product Image */}
        <div className="flex-1 border rounded-2xl overflow-hidden shadow-md w-full">
          <img
            src={mainImage}
            alt="Product"
            className="w-full h-96 object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-semibold text-gray-800 leading-snug">
          Organic Fruit & Vegetable Powder
        </h1>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">
            ₹{selectedVariant.price}
          </span>
          <span className="text-gray-500 line-through text-lg">
            ₹{selectedVariant.mrp}
          </span>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
            Save ₹{selectedVariant.mrp - selectedVariant.price}
          </span>
        </div>

        {/* Weight Options */}
        <div>
          <h3 className="text-sm text-gray-700 mb-2 font-medium">
            Select Weight:
          </h3>
          <div className="flex gap-3 flex-wrap">
            {productVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant)}
                className={`border rounded-xl px-4 py-2 font-medium ${
                  selectedVariant.id === variant.id
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 text-gray-700 hover:border-green-400"
                }`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Product Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="text-green-600" /> 100% Natural
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Droplet className="text-green-600" /> No Added Color
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Heart className="text-green-600" /> Sugar-Free
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Leaf className="text-green-600" /> Vegan Friendly
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Shield className="text-green-600" /> Certified Organic
          </div>
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart}  disabled={isDisabled} className={`mt-6 flex items-center justify-center gap-2 w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl shadow-md transition-all ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}>
          <ShoppingBag size={18} />
        {isDisabled ? "Added to cart..." : "Add to cart"}
        </button>
      </div>

        
    </div>

   

      </>
  );
}

export default ProductDetails;
