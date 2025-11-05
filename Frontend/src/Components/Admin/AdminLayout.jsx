 import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex  bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1   p-4 sm:p-6">
        <div className="text-center mb-6 mt-4 lg:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">
            Welcome to Noor Enterprise Admin Dashboard
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-xl  sm:p-6 min-h-[70vh] w-full">
          {/* Dynamic page content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
