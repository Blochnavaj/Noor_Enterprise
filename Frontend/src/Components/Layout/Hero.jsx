 import React from "react";
import { motion } from "framer-motion";
import {assets} from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
 
function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative w-full h-[85vh] flex items-center justify-center bg-cover bg-center text-white "
      style={{
        backgroundImage: `url(${assets.Hero_Banner})`,
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
          Boost Your Day with <span className="text-yellow-400">Fruit Power</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 mb-6">
          Fresh, natural, and packed with vitamins — energize your body with every sip.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('shop')}
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;
