 import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import assets from '../../assets/assets';

function CartContext() {
  const Product = [
    { productId: 1, name: "Orange Power", size: "Small", quantity: 2, price: 100, image: assets.product1 },
    { productId: 2, name: "Mango Power", size: "Medium", quantity: 1, price: 150, image: assets.product2 },
    { productId: 3, name: "Onion Power", size: "Large", quantity: 3, price: 80, image: assets.product3 },
    { productId: 4, name: "Apple Power", size: "Small", quantity: 1, price: 120, image: assets.product4 },
    { productId: 5, name: "Carrot Power", size: "Medium", quantity: 2, price: 90, image: assets.product5 },
    { productId: 6, name: "Banana Power", size: "Large", quantity: 1, price: 110, image: assets.product1 },
    { productId: 7, name: "Spinach Power", size: "Small", quantity: 4, price: 70, image: assets.product2 },
    { productId: 8, name: "Strawberry Power", size: "Medium", quantity: 1, price: 200, image: assets.product3 },
    { productId: 9, name: "Tomato Power", size: "Large", quantity: 2, price: 85, image: assets.product4 },
    { productId: 10, name: "Pineapple Power", size: "Medium", quantity: 3, price: 180, image: assets.product5 }
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
    <div className="p-4 space-y-4">
      {cartItems.map((item) => (
        <div key={item.productId} className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition-shadow duration-300">
          
          {/* Product Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 sm:w-20 sm:h-20 rounded-xl object-cover border flex-shrink-0"
          />

          {/* Product Details */}
          <div className="flex-1 px-0 sm:px-4 mt-2 sm:mt-0 w-full sm:w-auto">
            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
            <p className="text-gray-500 text-sm">Size: {item.size}</p>
            <p className="font-bold text-gray-900 mt-1">₹{item.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-2 mt-3 bg-gray-100 rounded-full w-max px-2 py-1">
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
          </div>

          {/* Smaller Remove Button */}
          <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0">
            <button
              onClick={() => removeItem(item.productId)}
              className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContext;
