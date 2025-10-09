 import React from 'react'
  import { Routes , Route } from 'react-router-dom'
import UserLayout from './Components/Layout/UserLayout'

 function App() {
   return (
     <> 
      <Routes>
      <Route path='/' element={        <UserLayout/>}>
        {/* user Layout */}

      </Route>

         <Route>
          {/* Admin Layout */}
         </Route>
      </Routes>
     </>
   )
 }
 
 export default App