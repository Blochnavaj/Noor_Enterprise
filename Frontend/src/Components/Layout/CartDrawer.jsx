 import React, { useState } from 'react';
import { X } from 'lucide-react'; // Or use any icon library you prefer
import CartContext from '../Cart/CartContext';

function CartDrawer({handlerDrawer,drawerOpen }) {

  return (
    <>
   

      <div className={`fixed top-0 right-0 w-3/4 sm:w-1/3 md:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={handlerDrawer}>
            <X size={24} className="text-gray-700 hover:text-red-500" />
          </button>
        </div>

        {/* Cart content */}
        <div className="flex-grow overflow-y-auto p-4">
          <h1 className='text-xl font-bold text-gray-500'>Your Cart </h1>
          {/* Components for cart Context */}
              <CartContext/>
        </div>

        {/* checkout button fixed at bottom */}

       <div className=" sticky bottom-0 p-4">
  <button className="bg-black rounded-md px-4 w-full py-2 border text-white hover:bg-slate-400 hover:text-black">
    CheckOut
  </button>
  <p className="mt-2 text-center text-sm tracking-tighter">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</div>
      </div>
    </>
  )
}

export default CartDrawer;
