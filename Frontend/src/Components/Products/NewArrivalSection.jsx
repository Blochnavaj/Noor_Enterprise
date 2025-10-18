 import React from "react";
import assets from "../../assets/assets";

function NewArrivalSection() {
  const products = [
    {
      id: 1,
      name: "Vitamin C Serum",
      price: 799,
      image: assets.product1,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Niacinamide Face Wash",
      price: 499,
      image: assets.product2,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Hyaluronic Acid Gel",
      price: 899,
      image:  assets.product3,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Retinol Night Cream",
      price: 1299,
      image:  assets.product4,
      rating: 4.6,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          🌟 New Launches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < Math.floor(product.rating) ? "★" : "☆"}
                  </span>
                ))}
                <span className="text-gray-500 ml-2">{product.rating}</span>
              </div>
              <p className="text-gray-800 font-bold text-lg mb-4">₹{product.price}</p>
              <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivalSection;
