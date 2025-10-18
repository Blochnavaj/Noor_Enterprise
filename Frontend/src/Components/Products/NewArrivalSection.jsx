 import React from "react";
import assets from "../../assets/assets";
import { ShoppingBag } from "lucide-react";

function NewArrivalSection() {
  const products = [
    {
      id: 1,
      name: "Vitamin C Face Wash",
      mrp: 999,
      price: 799,
      image: assets.product1,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Niacinamide Face Wash",
      mrp: 699,
      price: 499,
      image: assets.product2,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Hyaluronic Acid Gel",
      mrp: 1099,
      price: 899,
      image: assets.product3,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Retinol Night Cream",
      mrp: 1499,
      price: 1299,
      image: assets.product4,
      rating: 4.6,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            🌟 New Launches
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our newest range of natural products — crafted with love and 100% pure ingredients.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const discount = Math.round(
              ((product.mrp - product.price) / product.mrp) * 100
            );

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative cursor-pointer"
              >
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition">
                    {product.name}
                  </h3>

                  {/* Rating */}
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

                  {/* Pricing */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{product.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      ₹{product.mrp}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-full transition-all shadow-md">
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NewArrivalSection;
