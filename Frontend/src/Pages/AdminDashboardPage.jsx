 import React from "react";
import { DollarSign, Package, ShoppingCart } from "lucide-react";

function AdminDashboardPage() {
  const orders = [
    { id: "ORD1234", user: "John Doe", total: "$250.00", status: "Delivered" },
    { id: "ORD1235", user: "Jane Smith", total: "$180.00", status: "Pending" },
    { id: "ORD1236", user: "Mark Taylor", total: "$320.00", status: "Cancelled" },
    { id: "ORD1237", user: "Emma Watson", total: "$150.00", status: "Delivered" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* ====== Top Cards Section ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Total Revenue</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-2">$25,400</p>
          </div>
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <DollarSign size={28} />
          </div>
        </div>

        {/* Total Products */}
        <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Total Products</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-2">320</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Package size={28} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition-shadow">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Total Orders</h2>
            <p className="text-2xl font-semibold text-gray-800 mt-2">890</p>
          </div>
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <ShoppingCart size={28} />
          </div>
        </div>
      </div>

      {/* ====== Recent Orders Table ====== */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-700">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{order.user}</td>
                  <td className="py-3 px-4 text-gray-600">{order.total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
