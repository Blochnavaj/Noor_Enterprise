 import React from "react";
import { CheckCircle, Clock, MapPin, CalendarDays, Truck } from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function CheckoutConfirmation() {
  const navigate = useNavigate();

  // 🧾 Dummy cart data
  const cart = {
    products: [
      {
        id: 1,
        name: "Organic Green Tea",
        size: "250g",
        price: 299,
        mrp: 399,
        quantity: 2,
        image: assets.product1,
      },
      {
        id: 2,
        name: "Natural Honey Jar",
        size: "500ml",
        price: 499,
        mrp: 649,
        quantity: 1,
        image: assets.product2,
      },
      {
        id: 3,
        name: "Herbal Face Cream",
        size: "100ml",
        price: 349,
        mrp: 499,
        quantity: 1,
        image: assets.product3,
      },
    ],
  };

  // 🧮 Totals
  const totalMRP = cart.products.reduce((acc, p) => acc + p.mrp * p.quantity, 0);
  const totalPrice = cart.products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const totalDiscount = totalMRP - totalPrice;

  // 💳 Dummy payment status & order info
  const order = {
    paymentId: "pay_test_123456789",
    status: "Paid", // Change to "Pending" to test UI
    customerName: "Navaj Bloch",
    address: {
      line1: "12A, Sunrise Apartment",
      city: "Ahmedabad",
      state: "Gujarat",
      postalCode: "380015",
      country: "India",
      phone: "+91 98765 43210",
    },
  };

  // 📅 Dates
  const orderDate = new Date();
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5);

  const formattedOrderDate = orderDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl">
        {/* ✅ Header Section */}
        <div className="text-center border-b pb-6 mb-6">
          {order.status === "Paid" ? (
            <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-3" />
          ) : (
            <Clock className="mx-auto text-yellow-500 w-16 h-16 mb-3" />
          )}
          <h1 className="text-3xl font-bold text-gray-800">
            {order.status === "Paid"
              ? "Payment Successful!"
              : "Payment Pending"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Payment ID:{" "}
            <span className="font-medium text-gray-700">
              {order.paymentId || "N/A"}
            </span>
          </p>
        </div>

        {/* 📦 Order Details Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Order Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              🛍️ Order Summary
            </h2>

            <div className="divide-y divide-gray-200">
              {cart.products.map((item, i) => {
                const itemTotal = item.price * item.quantity;
                const discount = Math.round(
                  ((item.mrp - item.price) / item.mrp) * 100
                );
                return (
                  <div
                    key={i}
                    className="flex justify-between py-4 items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.size} × {item.quantity}
                        </p>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-green-600 font-bold text-md">
                            ₹{item.price}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ₹{item.mrp}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {discount}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-green-600 font-semibold text-md">
                      ₹{itemTotal}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Summary Totals */}
            <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
              <div className="flex justify-between text-sm">
                <span>Total MRP:</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Total Discount:</span>
                <span>-₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-3">
                <span>Total Paid:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Right side - Delivery Details */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              Delivery Details
            </h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <p>
                  <span className="font-medium">{order.customerName}</span>,{" "}
                  {order.address.line1}, {order.address.city},{" "}
                  {order.address.state} - {order.address.postalCode}
                </p>
              </div>
              <p className="ml-6">{order.address.country}</p>
              <p className="ml-6">📞 {order.address.phone}</p>
            </div>

            {/* Order & Delivery Dates */}
            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <CalendarDays className="w-4 h-4 text-green-500" />
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {formattedOrderDate}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Truck className="w-4 h-4 text-green-500" />
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {formattedDeliveryDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🎉 Continue Shopping */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/shop")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutConfirmation;
