 import React, { useState } from "react";
import ProductGrid from "../Components/Products/ProductGrid.jsx";
import {products} from "../assets/assets.js";

function ShopCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("");

  // Filter by category
  const filteredByCategory =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Filter by price range (min price of first pack)
  const filteredProducts = filteredByCategory.filter((p) => {
    const minPrice = Math.min(...p.packs.map((pack) => pack.price));
    return minPrice >= priceRange[0] && minPrice <= priceRange[1];
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
      <div className="w-full md:w-1/4 bg-white shadow-md p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Category</h2>
          {["All", "Vegetable", "Fruit"].map((cat) => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <span className="text-gray-700">{cat}</span>
            </label>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Price Range</h2>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="w-20 border rounded p-1"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            />
            <span>—</span>
            <input
              type="number"
              className="w-20 border rounded p-1"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Shop Collection</h2>
          <select
            className="border p-2 rounded-md"
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
