 import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-indigo-700">
            Welcome to Noor Enterprise Admin Dashboard
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 min-h-[70vh]">
          {/* All other admin pages (Add Product, Users, etc.) will render here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
