 import React, { useState } from "react";
import Input from "../Common/Input";
import styled from "styled-components";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

function CheckOut() {
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

  // Total calculations
  const totalMRP = cart.products.reduce((acc, p) => acc + p.mrp * p.quantity, 0);
  const totalPrice = cart.products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const totalDiscount = totalMRP - totalPrice;

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // 💳 Razorpay payment handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      key: "rzp_test_RWOJC3K2pBnRE8", // 👉 Replace this with your Razorpay Key ID
      amount: totalPrice * 100, // amount in paisa
      currency: "INR",
      name: "noor enterprise",
      description: "Order Payment",
      image: assets.logo, // optional
      handler: function (response) {
        // alert("✅ Payment successful! Payment ID: " + response.razorpay_payment_id);
        navigate("/checkout-confirmation");
      },
      prefill: {
        name: `${shippingAddress.firstname} ${shippingAddress.lastname}`,
        email: "user@example.com",
        contact: shippingAddress.phone,
      },
      theme: {
        color: "#22c55e",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT SECTION - FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            🛍️ Checkout Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <Input label="First Name" name="firstname" value={shippingAddress.firstname} onChange={handleChange} />
            <Input label="Last Name" name="lastname" value={shippingAddress.lastname} onChange={handleChange} />
            <Input label="Address" name="address" value={shippingAddress.address} onChange={handleChange} />
            <Input label="City" name="city" value={shippingAddress.city} onChange={handleChange} />
            <Input label="Postal Code" name="postalCode" value={shippingAddress.postalCode} onChange={handleChange} />
            <Input label="Phone" name="phone" value={shippingAddress.phone} onChange={handleChange}   />
            <Input label="Country" name="country" value={shippingAddress.country} onChange={handleChange} />

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT SECTION - CART SUMMARY */}
        <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            🛒 Order Summary
          </h2>

          <div className="space-y-5">
            {cart.products.map((item, index) => {
              const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
              return (
                <div key={index} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
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
                </div>
              );
            })}
          </div>

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
              <span>Payable Amount:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f9fc 0%, #e8f0fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CheckOut;
