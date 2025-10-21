 import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import {assets} from '../assets/assets.js';

// Dummy JSON data
const ordersData = [
  {
    "id": 1,
    "orderId": "ORD1001",
    "image": assets.product1,
    "price": 799,
    "address": "123 Green St, Ahmedabad, India",
    "created": "2025-10-10",
    "items": [
      { "name": "Vitamin C Face Wash", "qty": 1 },
      { "name": "Niacinamide Face Wash", "qty": 2 }
    ],
    "status": "Delivered"
  },
  {
    "id": 2,
    "orderId": "ORD1002",
    "image":assets.product2,
    "price": 899,
    "address": "456 Blue Rd, Mumbai, India",
    "created": "2025-10-12",
    "items": [
      { "name": "Hyaluronic Acid Gel", "qty": 1 }
    ],
    "status": "Shipped"
  },
  {
    "id": 3,
    "orderId": "ORD1003",
    "image": assets.product3,
    "price": 1299,
    "address": "789 Yellow Ave, Delhi, India",
    "created": "2025-10-15",
    "items": [
      { "name": "Retinol Night Cream", "qty": 1 }
    ],
    "status": "Pending"
  }
];

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersData); // Load JSON data into state
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <CheckCircle size={16} /> Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="flex items-center gap-1 text-blue-600 font-semibold">
            <Clock size={16} /> Shipped
          </span>
        );
      case 'Pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 font-semibold">
            <Clock size={16} /> Pending
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-gray-600 font-semibold">
            <XCircle size={16} /> Unknown
          </span>
        );
    }
  };

  return (
    <section className="w-full py-16 px-6 md:px-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          My Orders
        </h1>

        {/* Table for desktop */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Created</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Items</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={order.image}
                      alt={order.items[0].name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{order.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">₹{order.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {order.items.map((item, index) => (
                      <p key={index}>{item.name} x {item.qty}</p>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <img src={order.image} alt={order.items[0].name} className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{order.orderId}</h3>
                  <p className="text-gray-600">₹{order.price}</p>
                  <p className="text-gray-500 text-sm">{order.address}</p>
                  <p className="text-gray-500 text-sm">Created: {order.created}</p>
                  <div className="mt-1">{getStatusBadge(order.status)}</div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Items:</h4>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">{item.name} x {item.qty}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyOrders;
