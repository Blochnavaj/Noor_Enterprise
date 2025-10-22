 import React from "react";
import { X } from "lucide-react";
import CartContext from "../Cart/CartContext";
import { Navigate, useNavigate } from "react-router-dom";

function CartDrawer({ handlerDrawer, drawerOpen }) {

  const navigate = useNavigate(); 
  const handleCheckOut = () => {
 navigate("/checkout");
 handlerDrawer(false);
  }
  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handlerDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-700">Your Cart 🛒</h1>
          <button
            onClick={handlerDrawer}
            className="text-gray-600 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          <CartContext />
        </div>

        {/* Checkout Section */}
        <div className="border-t border-gray-200 bg-white p-4">
          <button onClick={handleCheckOut} className="bg-black w-full py-3 text-white rounded-lg font-medium hover:bg-gray-800 transition-all">
            Proceed to Checkout
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Secure payment • Fast delivery • Easy returns
          </p>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
