 import React from 'react'
  import { Routes , Route } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'
import { Toaster } from 'sonner';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ShopCollection from './Pages/ShopCollection';

 function App() {
   return (
     <> 
     <Toaster position='top-right'  reverseOrder={false}/>
      <Routes>
      <Route path='/' element={        <UserLayout/>}>
      <Route path='login' element={<Login/>}/>
      <Route path='profile' element={<Profile/>} />
      <Route path='shop' element={<ShopCollection/>} />
        {/* user Layout */}
        <Route index element={<Home/>} />
      </Route>

         <Route>
          {/* Admin Layout */}
         </Route>
      </Routes>
     </>
   )
 }
 
 export default App