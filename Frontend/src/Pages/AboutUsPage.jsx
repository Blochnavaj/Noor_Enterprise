import React from "react";
import { assets } from "../assets/assets";

function AboutUsPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12">
      
      {/* LEFT SIDE - OWNER IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src={assets.photo}
          alt="Abu Sufiyan - Founder of Noor Enterprise"
          className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* RIGHT SIDE - TEXT CONTENT */}
      <div className="flex-1 space-y-6 text-gray-700 max-w-lg">
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight">
          About <span className="text-gray-900">Noor Enterprise</span>
        </h2>

        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-green-700">Noor Enterprise</span> —
          where nature meets purity. We specialize in crafting premium-quality
          <span className="font-medium"> organic fruit and vegetable powders</span> that bring
          the freshness of farms straight to your kitchen. Every product is made
          with love, care, and a commitment to your health and wellness.
        </p>

        <p className="text-lg leading-relaxed">
          Our powders are 100% natural, chemical-free, and packed with essential
          nutrients. Whether you’re a fitness enthusiast, a chef, or simply
          someone who loves living healthy — Noor Enterprise is your trusted
          partner for sustainable nourishment.
        </p>

        <div className="border-l-4 border-green-600 pl-4 text-gray-600 italic">
          “We don’t just sell powders — we deliver purity, health, and a taste
          of nature’s goodness.”
        </div>

        {/* OWNER DETAILS */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-900">Abu Sufiyan</h3>
          <p className="text-sm text-gray-500 mb-3">Founder & Owner, Noor Enterprise</p>
          <a
            href="https://www.linkedin.com/in/abu-sufiyan" // 🔗 Replace with actual LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full transition-all duration-300"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutUsPage;
