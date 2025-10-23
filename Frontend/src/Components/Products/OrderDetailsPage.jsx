 import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { CheckCircle, XCircle, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function OrderDetailsPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const id = "ORD123"; // Mock ID for demo
  const navigate = useNavigate();

  const handleClick = () => {
     navigate('/my-order');
     window.scrollTo( { top:0, behavior: "smooth"});
  }

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "Online",
      shippingAddress: { city: "New York", country: "USA", address: "123 Main St", postalCode: "10001" },
      shippingMethod: "Standard",
      productDetails: [
        { productId: '1', name: "Online Vegetable Power", price: 120, quantity: 2, image: assets.product1 },
        { productId: '2', name: "Mongo Power", price: 130, quantity: 7, image: assets.product1 },
        { productId: '3', name: "Raw Mongo Power", price: 120, quantity: 5, image: assets.product1 },
        { productId: '4', name: "Papaya Power", price: 120, quantity: 1, image: assets.product1 },
      ],
    };
    setOrderDetails(mockOrderDetails);
  }, [id]);

  if (!orderDetails) return <div className="text-center py-20">Loading Order Details...</div>;

  const totalAmount = orderDetails.productDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-semibold mb-6">Order Details</h1>

        {/* Modern Cards for Order Summary & Shipping */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="mb-2"><span className="font-medium">Order ID:</span> {orderDetails._id}</p>
          <p className="mb-2"><span className="font-medium">Order Date:</span> {orderDetails.createdAt.toDateString()}</p>
          <p className="mb-2 flex items-center">
            <span className="font-medium mr-2">Payment Status:</span>
            {orderDetails.isPaid ? (
              <CheckCircle className="text-green-500 w-5 h-5 mr-1"/> 
            ) : (
              <XCircle className="text-red-500 w-5 h-5 mr-1"/>
            )}
            <span className={orderDetails.isPaid ? "text-green-600" : "text-red-600"}>
              {orderDetails.isPaid ? 'Paid' : 'Not Paid'}
            </span>
          </p>
          <p className="mb-2 flex items-center">
            <span className="font-medium mr-2">Delivery Status:</span>
            <Truck className={`w-5 h-5 mr-1 ${orderDetails.isDelivered ? "text-green-500" : "text-orange-500"}`} />
            <span className={orderDetails.isDelivered ? "text-green-600" : "text-orange-600"}>
              {orderDetails.isDelivered ? 'Delivered' : 'Pending'}
            </span>
          </p>
          <p className="mb-2"><span className="font-medium">Payment Method:</span> {orderDetails.paymentMethod}</p>
          <p><span className="font-medium">Shipping Method:</span> {orderDetails.shippingMethod}</p>
        </div>

        {/* Shipping Address */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p className="mb-2">{orderDetails.shippingAddress.address}</p>
          <p className="mb-2">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
          <p className="mb-2">Postal Code: {orderDetails.shippingAddress.postalCode}</p>
        </div>

      </div>
      
    {/* Product List */}
<div className="bg-white shadow-lg rounded-xl p-6">
  <h2 className="text-xl font-semibold mb-4">Products</h2>

  {/* Table for medium+ screens */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-3">Product</th>
          <th className="text-left p-3">Price</th>
          <th className="text-left p-3">Quantity</th>
          <th className="text-left p-3">Total</th>
        </tr>
      </thead>
      <tbody>
        {orderDetails.productDetails.map((item) => (
          <tr key={item.productId} className="border-b">
            <td className="flex items-center p-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4"/>
              {item.name}
            </td>
            <td className="p-3">${item.price}</td>
            <td className="p-3">{item.quantity}</td>
            <td className="p-3">${item.price * item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile-friendly cards */}
  <div className="md:hidden space-y-4">
    {orderDetails.productDetails.map((item) => (
      <div key={item.productId} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-700 font-medium">${item.price}</p>
          <p className="text-gray-900 font-semibold">${item.price * item.quantity}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Total Amount */}
  <div className="text-right mt-6 text-lg font-bold">
    Total Amount: ${totalAmount}
  </div>
</div>

   <div>
    <button onClick={handleClick} className='mt-2 underline'>Back my order list</button>
   </div>

    </div>
  );
}

export default OrderDetailsPage;
