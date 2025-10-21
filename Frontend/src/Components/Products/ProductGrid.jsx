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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => {
        const currentPack = selectedPack[product.id];
        const discount = Math.round(
          ((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100
        );

        return (
          <div
            key={product.id}
            className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
          >
            <Link to={`/product/${product.id}`}>
              <div className="flex justify-center items-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[450px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-gray-500 ml-2 text-sm">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{currentPack.price}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ₹{currentPack.mrp}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    {discount}% OFF
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  {product.packs.map((pack) => (
                    <button
                      key={pack.size}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePackSelect(product.id, pack);
                      }}
                      className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                        selectedPack[product.id].size === pack.size
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
                      }`}
                    >
                      {pack.size}
                    </button>
                  ))}
                </div>
              </div>
            </Link>

            <div className="px-6 pb-6">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-full transition-all shadow-md"
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
