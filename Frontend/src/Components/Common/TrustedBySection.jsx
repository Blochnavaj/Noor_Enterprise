import React from "react";
import { motion } from "framer-motion";
import assets from "../../assets/assets"; // your logos/images here

function TrustedBySection() {
  const clients = [
    { id: 1, name: "Nature's Basket", logo: assets.client1 },
    { id: 2, name: "FreshlyFit", logo: assets.client2 },
    { id: 3, name: "GreenEarth", logo: assets.client3 },
    { id: 4, name: "HealthyHive", logo: assets.client4 },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Trusted by Leading Health & Organic Brands 🌿
        </h2>
        <p className="text-gray-600 mt-2 mb-8">
          Our 100% natural fruit & vegetable powders are proudly used by top food and wellness brands.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-6">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-green-100 shadow-md rounded-2xl p-4 w-36 h-24 flex justify-center items-center hover:shadow-lg transition"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="object-contain w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBySection;
