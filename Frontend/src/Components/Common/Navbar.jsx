 import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {assets} from "../../assets/assets.js";
import {User,ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
 import CartDrawer from "../Layout/CartDrawer";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handlerDrawer = () => setDrawerOpen(!drawerOpen);

  const menuLink = [
    { id: 1, name: "HOME", path: "/" },
    { id: 2, name: "SHOP", path: "shop" },
    // { id: 3, name: "SERVICE", path: "#service" },
    { id: 4, name: "ABOUT US", path: "about-us" },
    { id: 5, name: "FAQ", path: "faq" },
    { id: 6, name: "CONTACT", path: "contact-us" },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-sm   top-0 left-0 z-50">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
          {/* Logo Left */}
          <NavLink to="/">
            <motion.img
              src={assets.logo}
              alt="Logo"
              className="h-16 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            />
          </NavLink>

          {/* Center Links */}
          <ul className="flex gap-10">
            {menuLink.map((nav) => (
              <li key={nav.id} className="relative group">
                <NavLink
                  to={nav.path}
                  className="text-gray-800 font-medium hover:text-green-600 transition-all duration-300"
                >
                  {nav.name}
                </NavLink>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Icons Right */}
          <div className="flex items-center gap-5">
         
             <button onClick={handlerDrawer} className="relative">
              <ShoppingCart size={25} className="cursor-pointer hover:text-green-600 transition" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 rounded-full">
                4
              </span>
            </button>
            <NavLink to='/login'>
            <User size={25} className="cursor-pointer hover:text-green-600 transition" />
            </NavLink>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden justify-between items-center px-6 py-3 shadow-sm bg-white">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={26} className="text-gray-800" />
          </button>
          <NavLink to="/">
            <img src={assets.logo} alt="Logo" className="h-14" />
          </NavLink>
          <button onClick={handlerDrawer} className="relative">
            <ShoppingCart size={26} className="text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 rounded-full">
              4
            </span>
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-2xl z-50 p-6 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-6"
              >
                <X size={26} />
              </button>

              <ul className="flex flex-col gap-6">
                {menuLink.map((nav) => (
                  <li key={nav.id}>
                    <NavLink
                      to={nav.path}
                      className="text-lg text-gray-800 hover:text-green-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      {nav.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <CartDrawer drawerOpen={drawerOpen} handlerDrawer={handlerDrawer} />
      </nav>
    </>
  );
}

export default Navbar;
