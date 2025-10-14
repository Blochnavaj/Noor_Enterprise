 import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import assets from "../../assets/assets";
 
function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-r from-green-50 via-white to-green-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 leading-tight mb-4">
            Fresh & Pure <br />
            <span className="text-green-600">Fruit & Veggie Powders</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Power up your health with 100% natural fruit and vegetable powders — 
            fresh, organic, and delivered straight to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300">
              <ShoppingBag size={22} />
              Shop Now
            </button>
            <button className="border border-green-600 text-green-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={assets.product1}
            alt="Fresh Fruit Powder"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-xl rounded-3xl"
          />
        </motion.div>
      </div>

      {/* Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 opacity-40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-green-300 opacity-30 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}

export default Hero;
