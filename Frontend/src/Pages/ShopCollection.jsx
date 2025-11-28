 import React, { useMemo, useState } from "react";
import ProductGrid from "../Components/Products/ProductGrid.jsx";
import { products as allProducts } from "../assets/assets.js";

const CATEGORIES = ["All", "Vegetable", "Fruit"];

export default function ShopCollection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  // Filter by category
  const filteredByCategory = useMemo(() => {
    if (selectedCategory === "All") return allProducts;
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Sort products (stable & memoized)
  const sortedProducts = useMemo(() => {
    const list = [...filteredByCategory];
    list.sort((a, b) => {
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
    return list;
  }, [filteredByCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold mb-4">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const selected = cat === selectedCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-150 font-medium ${
                      selected
                        ? "bg-green-600 text-white shadow"
                        : "bg-gray-100 text-gray-800 hover:bg-green-50"
                    }`}
                    aria-pressed={selected}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* extra filters (example) */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick filters</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("lowToHigh")}
                  className="text-xs px-3 py-1 border rounded-full bg-white hover:bg-gray-50"
                >
                  Low price
                </button>
                <button
                  onClick={() => setSortBy("highToLow")}
                  className="text-xs px-3 py-1 border rounded-full bg-white hover:bg-gray-50"
                >
                  High price
                </button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="md:col-span-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Shop Collection</h1>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="sr-only">Sort products</label>
                <select
                  id="sort"
                  className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort — Default</option>
                  <option value="lowToHigh">Price: Low → High</option>
                  <option value="highToLow">Price: High → Low</option>
                  <option value="aToZ">Name: A → Z</option>
                  <option value="zToA">Name: Z → A</option>
                </select>
              </div>
            </div>

            {/* Product grid */}
            <ProductGrid products={sortedProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
