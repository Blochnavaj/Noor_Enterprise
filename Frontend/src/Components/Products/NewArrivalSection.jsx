 import React from "react";
import {products} from "../../assets/assets.js";
import ProductGrid from "../Products/ProductGrid";

function NewArrivalSection() {
  const newArrivals = products.slice(0, 5); // only 5 products

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-green-50 to-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            🌿 New Launches
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our latest collection made with pure, natural ingredients
            to keep your skin glowing and healthy.
          </p>
        </div>

        <ProductGrid products={newArrivals} />
      </div>
    </section>
  );
}

export default NewArrivalSection;
