 import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, IndianRupee, ShoppingBag } from "lucide-react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const ordersData = [
  {
    id: 1,
    orderId: "ORD1001",
    image: assets.product1,
    price: 799,
    address: "123 Green St, Ahmedabad, India",
    created: "2025-10-10",
    items: [{ name: "Vitamin C Face Wash", qty: 1 }],
    status: "Online Paid",
  },
  {
    id: 2,
    orderId: "ORD1002",
    image: assets.product2,
    price: 899,
    address: "456 Blue Rd, Mumbai, India",
    created: "2025-10-12",
    items: [{ name: "Hyaluronic Acid Gel", qty: 1 }],
    status: "Online Paid",
  },
  {
    id: 3,
    orderId: "ORD1003",
    image: assets.product3,
    price: 1299,
    address: "789 Yellow Ave, Delhi, India",
    created: "2025-10-15",
    items: [{ name: "Retinol Night Cream", qty: 1 }],
    status: "Pending",
  },
];

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOrders(ordersData);
    window.scrollTo(0, 0);
  }, []);

  const handleRowClick = (order) => {
    navigate(`/order/${order.id}`); // use order.id instead of _id
    window.scrollTo(0, 0); // scroll to top when navigating
  };

  const getStatusBadge = (status) => {
    if (status === "Online Paid") {
      return (
        <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
          <CheckCircle size={16} /> Paid
        </span>
      );
    } else if (status === "Pending") {
      return (
        <span className="flex items-center gap-1 text-yellow-600 font-semibold bg-yellow-100 px-3 py-1 rounded-full">
          <Clock size={16} /> Pending
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full">
          <XCircle size={16} /> Unknown
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
        <ShoppingBag size={28} className="text-green-600" /> My Orders
      </h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => handleRowClick(order)}
            className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-2/3">
              <img
                src={order.image}
                alt={order.items[0].name}
                className="w-24 h-24 rounded-2xl object-cover shadow-md"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-lg text-gray-800">
                  Order ID: {order.orderId}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {order.items.map((item, index) => (
                    <span key={item.name}>
                      {item.name} × {item.qty}
                      {index < order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-500 mt-1">📍 {order.address}</p>
                <p className="text-sm text-gray-400 mt-1">🗓 {order.created}</p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 mt-4 md:mt-0">
              <div className="flex items-center gap-1 text-xl font-semibold text-green-700">
                <IndianRupee size={18} /> {order.price}
              </div>
              {getStatusBadge(order.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
