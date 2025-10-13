 import React, { useState } from "react";
import { Search, X } from "lucide-react";
import assets from "../../assets/assets";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => setIsOpen(!isOpen);

  const onSumbitHandler = (e) => {
    e.preventDefault();
    setIsOpen(false);
    console.log("search term : " , searchTerm);
  }

  return (
    <div className="relative">
      {/* 🔍 Default Navbar Icon */}
      {!isOpen && (
        <button
          onClick={handleSearchToggle}
          className="cursor-pointer hover:text-gray-500 transition"
        >
          <Search size={28} />
        </button>
      )}

      {/* 🔍 Overlay Search Bar */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-10 flex flex-col transition-all duration-300 animate-fadeIn">
          {/* Top bar with logo, search input, and close icon — all in one line */}
          <div className="flex items-center justify-between px-6 py-4 border-b gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src={assets.logo}
                alt="Logo"
                className="h-20 md:h-[7rem] object-contain"
              />
              
            </div>

            {/* Search Input */}
            <form
              className="relative flex items-center flex-1 max-w-md mx-6"
              onSubmit={onSumbitHandler}
           
            >
               
              <Search
                size={20}
                className="absolute left-4 text-gray-500 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-700 placeholder:text-gray-500"
              />
            </form>

            {/* Close Button */}
            <button
              onClick={handleSearchToggle}
              className="hover:text-gray-600 transition"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
