 import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Add Product", icon: <Package size={20} />, path: "/admin/add-product" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/order" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/add-users" },
    { name: "Shop", icon: <Store size={20} />, path: "/" },
  ];

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden mt-4 px-4 py-3 bg-white border-b shadow-sm">
         <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r shadow-sm flex flex-col justify-between z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className="hidden lg:block text-center py-6 border-b border-gray-200">
            <h1 className="text-lg font-bold text-indigo-600">Noor Enterprise</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>

          <nav className="mt-4 flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // auto-close on mobile
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600 border-l-4 border-indigo-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default AdminSidebar;
