 import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
  LogOut,
} from "lucide-react";

function AdminSidebar() {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Add Product", icon: <Package size={20} />, path: "/admin/add-product" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/order" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/add-users" },
    { name: "Shop", icon: <Store size={20} />, path: "/" },
  ];

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/')
  }


  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between fixed h-full">
      <div>
        <div className="text-center py-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-indigo-600">Noor Enterprise</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <nav className="mt-4 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
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
        <button onClick={handleLogOut} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
