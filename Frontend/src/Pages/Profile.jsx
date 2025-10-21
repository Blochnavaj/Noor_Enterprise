 
import React from 'react';
import MyOrders from './MyOrders';
import { LogOut } from 'lucide-react';

function Profile() {
  const user = {
    name: 'Bloch Navaj',
    email: 'Navajbloch22@gmail.com',
   };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        
        {/* Left Side - Profile Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center space-y-6">
          
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all duration-300">
            <LogOut size={18} /> Log Out
          </button>
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
