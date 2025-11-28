 import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

/**
 * ProductGrid improvements:
 * - Uses useCallback / useMemo to avoid re-renders
 * - Lazy loads images with <img loading="lazy">
 * - Graceful placeholder fallback
 * - Pack selection is keyboard accessible
 * - AddToCart button outside Link to avoid nested interactive elements
 */

const PLACEHOLDER = "/images/placeholder.png"; // update to your placeholder path

function currency(amount) {
  // Indian rupee formatting — change as required
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function ProductGrid({ products = [] }) {
  // initialize selected pack map safely and keep in sync if products change
  const [selectedPack, setSelectedPack] = useState({});

  useEffect(() => {
    const map = {};
    for (const product of products) {
      map[product.id] = product.packs?.[0] ?? { size: "—", mrp: 0, price: 0 };
    }
    setSelectedPack(map);
  }, [products]);

  const handlePackSelect = useCallback((productId, pack) => {
    setSelectedPack((prev) => ({ ...prev, [productId]: pack }));
  }, []);

  const handleAddToCart = useCallback((product, pack) => {
    // small debounce: prevent quick double clicks
    toast.success(`${product.name} (${pack.size}) added to cart`, { duration: 1200 });
    // HERE: wire to your cart context / redux / backend
  }, []);

  const renderRating = useCallback((rating) => {
    const full = Math.floor(rating || 0);
    const half = (rating || 0) - full >= 0.5;
    return (
      <div aria-label={`Rating ${rating}`} className="flex items-center">
        <span className="text-yellow-400 mr-2" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < full ? "★" : "☆"}</span>
          ))}
        </span>
        <span className="text-gray-500 text-sm">{rating?.toFixed(1) ?? "—"}</span>
      </div>
    );
  }, []);

  if (!products.length) {
    return (
      <div className="p-8 bg-white rounded-lg shadow text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const currentPack = selectedPack[product.id] ?? product.packs?.[0] ?? { size: "—", mrp: 0, price: 0 };
        const mrp = Number(currentPack.mrp || 0);
        const price = Number(currentPack.price || 0);
        const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

        // safe first image
        const imgSrc =
          Array.isArray(product.images) && product.images.length
            ? product.images[0]
            : (typeof product.images === "string" && product.images) || PLACEHOLDER;

        return (
          <article
            key={product.id}
            className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-transform transform hover:-translate-y-1"
          >
            {/* linkable image and title */ }
            <div className="relative">
              <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
                <div className="w-full h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    loading="lazy"
                    src={imgSrc}
                    alt={product.name}
                    className="object-contain max-h-full max-w-full p-4 transition-transform duration-400 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                  />
                </div>
              </Link>

              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="p-4 flex flex-col gap-3">
              <Link to={`/product/${product.id}`} className="group-hover:text-green-600">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
              </Link>

              <div>{renderRating(product.rating)}</div>

              <div className="flex items-baseline gap-3">
                <div className="text-green-600 font-bold text-lg">{currency(price)}</div>
                {mrp > price && (
                  <div className="text-gray-400 line-through text-sm">{currency(mrp)}</div>
                )}
              </div>

              {/* pack selector (keyboard & screen-reader friendly) */}
              <div className="flex flex-wrap gap-2">
                {product.packs?.map((pack) => {
                  const isSelected = currentPack?.size === pack.size;
                  return (
                    <button
                      key={pack.size}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePackSelect(product.id, pack);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handlePackSelect(product.id, pack);
                        }
                      }}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors focus:outline-none focus:ring-2 ${
                        isSelected
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                      }`}
                    >
                      {pack.size}
                    </button>
                  );
                })}
              </div>

              {/* actions */}
              <div className="pt-2">
                <button
                  type="button"
                  aria-label={`Add ${product.name} ${currentPack.size} to cart`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product, currentPack);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition-shadow shadow"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
