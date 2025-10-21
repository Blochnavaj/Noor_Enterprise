 import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, Leaf, Droplet, Heart, Shield, ShoppingBag } from "lucide-react";
import { products } from "../../assets/assets.js";
import { toast } from "sonner";

function ProductDetails() {
  const { id } = useParams(); // URL se product id
  const productId = parseInt(id);

  // Product find karo
  const product = products.find((p) => p.id === productId);

  // Agar product na mile
  if (!product) return <div className="text-center py-10">Product not found!</div>;

  // State
  const [selectedVariant, setSelectedVariant] = useState(product.packs[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [isDisabled, setIsDisabled] = useState(false);

  // Scroll to top aur reset variant jab product change ho
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedVariant(product.packs[0]);
    setMainImage(product.images[0]);
  }, [product]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a product size first!", { duration: 1000 });
      return;
    }
    toast.success("Product added to Cart", { duration: 1000 });
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side: Images */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-3 md:h-[400px] overflow-x-auto md:overflow-y-auto scrollbar-hide md:pr-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl cursor-pointer border-2 ${
                mainImage === img ? "border-green-500" : "border-transparent"
              } hover:scale-105 transition-transform duration-200`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 border rounded-2xl overflow-hidden  shadow-md w-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-96 object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Side: Product Details */}
      <div className="flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-semibold text-gray-800 leading-snug">{product.name}</h1>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">₹{selectedVariant.price}</span>
          <span className="text-gray-500 line-through text-lg">₹{selectedVariant.mrp}</span>
          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
            Save ₹{selectedVariant.mrp - selectedVariant.price}
          </span>
        </div>

        {/* Weight Options */}
        <div>
          <h3 className="text-sm text-gray-700 mb-2 font-medium">Select Weight:</h3>
          <div className="flex gap-3 flex-wrap">
            {product.packs.map((pack) => (
              <button
                key={pack.size}
                onClick={() => handleVariantChange(pack)}
                className={`border rounded-xl px-4 py-2 font-medium ${
                  selectedVariant.size === pack.size
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-300 text-gray-700 hover:border-green-400"
                }`}
              >
                {pack.size}
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

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className={`mt-6 flex items-center justify-center gap-2 w-full md:w-1/2 rounded-2xl font-semibold py-3 shadow-md transition ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <ShoppingBag size={18} />
          {isDisabled ? "Added to cart..." : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
