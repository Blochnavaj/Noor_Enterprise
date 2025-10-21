 import React from 'react'
import {assets} from '../../assets/assets.js'
import { Truck, RefreshCcw, ShieldCheck } from 'lucide-react'

function FeaturedCollection() {
  return (
    <section className="w-full min-h-screen py-20 px-6 md:px-16 bg-gradient-to-r from-green-50 to-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16">
        
        {/* Left side - text content */}
        <div className="flex flex-col items-start space-y-8">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Everyday Style 🌿
          </h2>
          <p className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-lg">
            Discover our <span className="font-semibold text-green-700">Featured Collection</span> — 
            where comfort meets elegance. Handpicked designs crafted with premium materials 
            to bring freshness, confidence, and simplicity to your wardrobe.
          </p>
          <button className="px-8 py-4 bg-green-700 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-800 transition-all duration-300">
            Shop Now
          </button>
        </div>

        {/* Right side - image */}
        <div className="relative flex justify-center">
          <img
            src={assets.Featured_Collection}
            alt="Featured Collection"
            className="w-[650px] h-[650px] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>
        </div>
      </div>

      {/* ✅ Feature Section */}
      <div className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {/* Free Delivery */}
        <div className="flex flex-col items-center bg-white shadow-md hover:shadow-xl rounded-2xl p-8 transition-all duration-300">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Truck className="text-green-700 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Free Delivery</h3>
          <p className="text-gray-600 mt-1 text-sm">On all orders over ₹799</p>
        </div>

        {/* 45 Days Replacement */}
        <div className="flex flex-col items-center bg-white shadow-md hover:shadow-xl rounded-2xl p-8 transition-all duration-300">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <RefreshCcw className="text-green-700 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">45 Days Replacement</h3>
          <p className="text-gray-600 mt-1 text-sm">Guaranteed satisfaction & easy returns</p>
        </div>

        {/* Secure Checkout */}
        <div className="flex flex-col items-center bg-white shadow-md hover:shadow-xl rounded-2xl p-8 transition-all duration-300">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <ShieldCheck className="text-green-700 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">100% Secure Checkout</h3>
          <p className="text-gray-600 mt-1 text-sm">Free, safe, and encrypted payment process</p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
