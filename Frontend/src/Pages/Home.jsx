import React from 'react'
import Hero from '../Components/Layout/Hero'
import ItemsCollection from '../Components/Products/ItemsCollection'
import NewArrivalSection from '../Components/Products/NewArrivalSection'
import TopBar from '../Components/Layout/TopBar'
import ProductDetails from '../Components/Products/ProductDetails'
import TrustedBySection from '../Components/Common/TrustedBySection'
import ClientTestimonialsSection from '../Components/Common/ClientTestimonialsSection'

function Home() {
  return (
    <> 
    <Hero/>
    <TopBar/>
    {/* <ItemsCollection/> */}
    <NewArrivalSection/>


{/* Best seller */}
    <div className=''>
      <h2 className='text-center mx-auto text-3xl  text-black font-bold tracking-tighter'>Best Seller</h2>
      <ProductDetails/>
      </div>    

      {/* <TrustedBySection/>
      <ClientTestimonialsSection/> */}
    </>
  )
}

export default Home