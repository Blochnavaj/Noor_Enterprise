 import React, { useState } from "react";
import ProductGrid from "../Components/Products/ProductGrid.jsx";
import { products } from "../assets/assets.js";

function ShopCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  // Filter by category
  const filteredByCategory =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Sort products
  const sortedProducts = [...filteredByCategory].sort((a, b) => {
    const minA = Math.min(...a.packs.map((pack) => pack.price));
    const minB = Math.min(...b.packs.map((pack) => pack.price));
    switch (sortBy) {
      case "lowToHigh":
        return minA - minB;
      case "highToLow":
        return minB - minA;
      case "aToZ":
        return a.name.localeCompare(b.name);
      case "zToA":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-md p-6 space-y-10 sticky top-0 h-screen">
        <div>
          <h2 className="text-xl font-semibold mb-6">Category</h2>
          {["All", "Vegetable", "Fruit"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition-all duration-200 font-medium ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Shop Collection
          </h2>
          <select
            className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
          </select>
        </div>

        {/* Product Grid */}
        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  );
}

export default ShopCollection;
