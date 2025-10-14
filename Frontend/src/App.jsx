 import React from 'react'
  import { Routes , Route } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'
import Home from './Pages/Home'

 function App() {
   return (
     <> 
      <Routes>
      <Route path='/' element={        <UserLayout/>}>
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