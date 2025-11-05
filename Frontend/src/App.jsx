import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import { Toaster } from 'sonner';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ShopCollection from './Pages/ShopCollection';
import ProductDetails from './Components/Products/ProductDetails';
import CheckOut from './Components/Cart/CheckOut';
import CheckoutConfirmation from './Components/Cart/CheckoutConfirmation';
import OrderDetailsPage from './Components/Products/OrderDetailsPage';
import MyOrders from './Pages/MyOrders';
import AboutUsPage from './Pages/AboutUsPage';
import FAQPage from './Pages/FAQPage';
import ContactPage from './Pages/ContactPage';
// import RouteLoader from './Components/Common/RouteLoader';
import AdminLayout from './Components/Admin/AdminLayout';
import AddProduct from './Components/Admin/AddProduct';
import OrderPage from './Components/Admin/OrderPage';
import UserPage from './Components/Admin/UserPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';

function App() {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      {/* <RouteLoader> */}
      <Routes>

        <Route path='/' element={<UserLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='shop' element={<ShopCollection />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='checkout-confirmation' element={<CheckoutConfirmation />} />
          <Route path='order/:id' element={<OrderDetailsPage />} />
          <Route path='my-order' element={<MyOrders/>} />
          <Route path='about-us' element={<AboutUsPage/>} />
          <Route path='faq' element={<FAQPage/>} />
          <Route path='contact-us' element={<ContactPage/>} />

          {/* user Layout */}
          <Route index element={<Home />} />
        </Route>

        <Route path='/admin' element={<AdminLayout/>}>
        <Route index element={<AdminDashboardPage/>} />
         {/* Admin Layout */} 
         <Route path='add-product' element={<AddProduct/>} />
         <Route path='order' element={<OrderPage/>} />
         <Route path='add-users' element={<UserPage/>} />
        </Route>
      </Routes>
      {/* </RouteLoader> */}
    </>
  )
}

export default App