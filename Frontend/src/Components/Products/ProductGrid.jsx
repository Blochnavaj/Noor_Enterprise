 import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function ProductGrid({ products }) {
  const [selectedPack, setSelectedPack] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.packs[0];
      return acc;
    }, {})
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Product added to cart", { duration: 1000 });
  };

  const handlePackSelect = (productId, pack) => {
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {products.map((product) => {
        const currentPack = selectedPack[product.id];
        const discount = Math.round(
          ((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100
        );

        return (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
          >
            {/* Image Section */}
            <Link to={`/product/${product.id}`}>
              <div className="relative w-full h-72 flex justify-center items-center bg-gray-50 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-contain h-full w-full p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {discount > 0 && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-green-600 transition">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-gray-500 ml-2 text-sm">
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{currentPack.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ₹{currentPack.mrp}
                  </span>
                </div>

                {/* Pack Options */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.packs.map((pack) => (
                    <button
                      key={pack.size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePackSelect(product.id, pack);
                      }}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${
                        selectedPack[product.id].size === pack.size
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                      }`}
                    >
                      {pack.size}
                    </button>
                  ))}
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <div className="px-5 pb-5">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-all shadow-md"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductGrid;
