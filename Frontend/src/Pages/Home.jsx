import React from 'react'
import Hero from '../Components/Layout/Hero'
import NewArrivalSection from '../Components/Products/NewArrivalSection'
import TopBar from '../Components/Layout/TopBar'
import ProductDetails from '../Components/Products/ProductDetails'
import FeatutedCollection from '../Components/Products/FeatutedCollection'

function Home() {
  return (
    <> 
    <Hero/>
    <TopBar/>
 
    <NewArrivalSection/>


{/* Best seller */}
    <div className=''>
      <h2 className='text-center mx-auto text-3xl  text-black font-bold tracking-tighter'>Best Seller</h2>
      <ProductDetails/>
      </div>    

      <FeatutedCollection/>
 
    </>
  )
}

export default Home