 import React from "react";
import { Facebook, Instagram, Linkedin, Youtube, Mail, ArrowRight } from "lucide-react";
import {assets} from "../../assets/assets.js";
; // 👈 Replace with your actual logo path

function Footer() {
  return (
    <footer className="bg-black text-white px-8 md:px-20 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Blogs</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">Policies</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Search</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Refund Policy</li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
            <li className="hover:text-white cursor-pointer">Terms of Service</li>
            <li className="hover:text-white cursor-pointer">Shipping Policy</li>
          </ul>
        </div>

        {/* GET SOCIAL */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">Get Social</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Tangra Industries Estate Phase 1, 45 Radhanath Chowdhury Road <br />
            Tangra, Kolkata, West Bengal 700015 <br />
            India
          </p>
          <p className="mt-3 text-gray-300 text-sm">
            <span className="font-medium">FSSAI:</span> 12825999000459
          </p>
          <p className="mt-2 underline hover:text-orange-400 cursor-pointer text-sm">
            9147080888
          </p>
          <p className="underline hover:text-orange-400 cursor-pointer text-sm">
            yourmeal@spiceupfood.in
          </p>

          <div className="flex space-x-4 mt-5">
            <div className="bg-gray-800 hover:bg-orange-500 transition rounded-full p-2 cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="bg-gray-800 hover:bg-orange-500 transition rounded-full p-2 cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="bg-gray-800 hover:bg-orange-500 transition rounded-full p-2 cursor-pointer">
              <Linkedin size={18} />
            </div>
            <div className="bg-gray-800 hover:bg-orange-500 transition rounded-full p-2 cursor-pointer">
              <Youtube size={18} />
            </div>
          </div>
        </div>

        {/* SUBSCRIBE */}
        <div>
          <h3 className="font-semibold text-lg mb-4 uppercase tracking-wide">Subscribe</h3>
          <p className="text-gray-300 text-sm mb-4">
            Enter your email below to be the first to know about new collections and product launches.
          </p>

          <div className="flex items-center bg-gray-900 rounded-md overflow-hidden border border-gray-700 focus-within:border-orange-500">
            <Mail className="text-gray-400 ml-3" size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm px-3 py-3 w-full outline-none text-white"
            />
            <button className="bg-orange-500 hover:bg-orange-600 p-3 transition">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-gray-500 text-sm">
        <p>© SPICE UP FOODS 2023</p>
        <img src={assets.logo} alt="Logo" className="w-24 md:w-28 object-contain mt-4 sm:mt-0" />
      </div>
    </footer>
  );
}

export default Footer;
