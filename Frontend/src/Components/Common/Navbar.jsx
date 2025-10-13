 import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import assets from "../../assets/assets";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // cart items function 
   const [drawerOpen, setDrawerOpen] = useState(true);

  const handlerDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  const menuLink = [
    { id: 1, name: "HOME", path: "#home" },
    { id: 2, name: "SHOP", path: "#shop" },
    { id: 3, name: "SERVICE", path: "#service" },
    { id: 4, name: "ABOUT US", path: "#about-us" },
    { id: 5, name: "FAQ", path: "#faq" },
    { id: 6, name: "CONTACT US", path: "#contact-us" },
  ];

  return (
    <>
      <nav className="w-full relative">
        {/* Top Section: Logo */}
        <div className=" hidden md:flex justify-center py-4">
          <NavLink to="/">
            <img src={assets.logo} alt="Logo" className="h-20 md:h-[7rem]" />
          </NavLink>

           {/* Right Side Icons */}
          <ul className="flex items-center gap-5 absolute top-16 right-9 ">
            {/* <li className="cursor-pointer hover:text-gray-500 transition">
              <Search size={30} />
            </li> */}
            <div className="overflow-hidden">

            <SearchBar/>
            </div>
            <li className="cursor-pointer relative hover:text-gray-500 transition">
              <Heart size={30} />
              <span className="absolute bg-red-400 text-white rounded-full px-2 -top-2 py-0.5 text-xs -right-2 ">4</span>
            </li>
            <button onClick={handlerDrawer} className=" relative cursor-pointer hover:text-gray-500 transition">
              <ShoppingCart size={30} />
                            <span className="absolute bg-red-400 text-white rounded-full px-2 -top-2 py-0.5 text-xs -right-2 ">4</span>

            </button>
            <li className="cursor-pointer hover:text-gray-500 transition">
              <User size={30} />
            </li>
          </ul>
        </div>
      

        {/* Desktop NavLinks + Icons */}
        <div className="hidden md:flex justify-center items-center gap-6 relative">
          {/* NavLinks */}
          <ul className="flex gap-10">
            {menuLink.map((nav) => (
              <li key={nav.id} className="relative group">
                <NavLink
                  to={nav.path}
                  className="text-black text-md font-medium hover:text-gray-500 transition-colors duration-300"
                >
                  {nav.name}
                </NavLink>
                {/* underline animation */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>

           </div>

        {/* Mobile: Logo + Hamburger + Cart */}
        <div className="flex md:hidden justify-between items-center px-6 py-2 overflow-hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-black"
          >
            <Menu size={28} />
          </button>
          <NavLink to="/">
            <img src={assets.logo} alt="Logo" className="h-16" />
          </NavLink>
         <button onClick={handlerDrawer} className="relative cursor-pointer">
             <ShoppingCart size={28} className="text-black " />
        <span className="absolute bg-red-400 text-white rounded-full px-2 -top-2 py-0.5 text-xs -right-2 ">4</span>

         </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-6 flex flex-col"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="self-end mb-6"
              >
                <X size={28} />
              </button>

              <ul className="flex flex-col gap-5">
                {menuLink.map((nav) => (
                  <li key={nav.id}>
                    <NavLink
                      to={nav.path}
                      className="text-lg text-black hover:text-gray-500"
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

        <CartDrawer  drawerOpen={drawerOpen} handlerDrawer={handlerDrawer}/>
      </nav>
    </>
  );
}

export default Navbar;
