 import React, { useState } from "react";
import assets from "../../assets/assets";

function CartContext() {
  const Product = [
    { productId: 1, name: "Orange Power", size: "Small", quantity: 2, price: 100, mrp: 130, image: assets.product1 },
    { productId: 2, name: "Mango Power", size: "Medium", quantity: 1, price: 150, mrp: 180, image: assets.product2 },
    { productId: 3, name: "Onion Power", size: "Large", quantity: 3, price: 80, mrp: 100, image: assets.product3 },
    { productId: 4, name: "Apple Power", size: "Small", quantity: 1, price: 120, mrp: 150, image: assets.product4 },
    { productId: 5, name: "Carrot Power", size: "Medium", quantity: 2, price: 90, mrp: 120, image: assets.product5 },
  ];

  const [cartItems, setCartItems] = useState(Product);

  const incrementQuantity = (id) => {
    setCartItems(cartItems.map(item => item.productId === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (id) => {
    setCartItems(cartItems.map(item => item.productId === id ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.productId !== id));
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🛒 Your Cart</h2>

      {cartItems.map((item) => {
        const discountPercent = Math.round(((item.mrp - item.price) / item.mrp) * 100);

        return (
          <div
            key={item.productId}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-all duration-300"
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border flex-shrink-0"
            />

            {/* Product Info */}
            <div className="flex-1 px-0 sm:px-4 mt-3 sm:mt-0 w-full sm:w-auto">
              <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>

              {/* Price & Discount */}
              <div className="mt-2">
                <p className="text-lg font-bold text-gray-900">₹{item.price} 
                  <span className="text-sm text-gray-500 line-through ml-2">₹{item.mrp}</span>
                  <span className="text-sm text-green-600 ml-2 font-medium">({discountPercent}% OFF)</span>
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-2 mt-4 bg-gray-100 rounded-full w-max px-2 py-1">
                <button
                  onClick={() => decrementQuantity(item.productId)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-3 font-medium">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.productId)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.productId)}
                className="mt-3 text-red-500 font-medium hover:text-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      {cartItems.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-10">
          Your cart is empty 😕
        </div>
      )}
    </div>
  );
}

export default CartContext;
