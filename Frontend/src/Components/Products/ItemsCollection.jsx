 import React from "react";
import assets from "../../assets/assets";
import { motion } from "framer-motion";

function ItemsCollection() {
  const collections = [
    {
      id: 1,
      title: "Fresh Fruit Collection",
      desc: "Naturally sweet, handpicked fruits that keep your body energized and glowing every day.",
      image: assets.Fruit_Collection_Section,
      color: "from-yellow-50 via-yellow-100 to-white",
      buttonColor: "bg-yellow-400 text-black hover:bg-yellow-300",
      accent: "text-yellow-500",
    },
    {
      id: 2,
      title: "Organic Vegetable Collection",
      desc: "Crisp, clean, and grown with care — enjoy farm-fresh organic vegetables straight from the soil.",
      image: assets.Veg_Collection_Section,
      color: "from-green-50 via-green-100 to-white",
      buttonColor: "bg-green-500 text-white hover:bg-green-400",
      accent: "text-green-500",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col space-y-20">
        {collections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`relative flex flex-col ${
              index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r ${item.color}`}
          >
            {/* Background Accent Circle */}
            <div
              className={`absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br ${item.color} opacity-40 blur-2xl`}
            ></div>

            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] md:h-[480px] object-cover rounded-t-3xl md:rounded-none md:rounded-l-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent md:hidden rounded-t-3xl"></div>
            </motion.div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 px-6 md:px-12 py-10 flex flex-col justify-center text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl md:text-5xl font-extrabold mb-4 ${item.accent}`}
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
              >
                {item.desc}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${item.buttonColor} px-8 py-3 text-lg rounded-full font-semibold shadow-md transition`}
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ItemsCollection;
