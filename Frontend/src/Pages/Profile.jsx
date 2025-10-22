 import React from "react";
import { LogOut, ShoppingBag, Mail } from "lucide-react";
import MyOrders from "./MyOrders";

function Profile() {
  const user = {
    name: "Bloch Navaj",
    email: "Navajbloch22@gmail.com",
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left Side - Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-white flex items-center justify-center text-4xl font-bold shadow-md">
            {user.name[0]}
          </div>

          <h2 className="mt-4 text-2xl font-extrabold text-gray-800 tracking-wide">
            {user.name}
          </h2>

          <p className="text-gray-600 flex items-center gap-2 text-sm mt-1">
            <Mail size={16} /> {user.email}
          </p>

          <div className="mt-6 w-full flex justify-center">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300">
              <LogOut size={18} /> Log Out
            </button>
          </div>

          <div className="mt-8 bg-green-50 w-full rounded-2xl py-4 flex items-center justify-center text-green-700 font-semibold gap-2 shadow-inner">
            <ShoppingBag size={20} />
            My Orders Overview
          </div>
        </div>

        {/* Right Side - My Orders */}
        <div className="md:col-span-2">
          <MyOrders />
        </div>
      </div>
    </section>
  );
}

export default Profile;
