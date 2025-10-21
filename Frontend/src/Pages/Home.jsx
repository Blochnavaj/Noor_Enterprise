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

      <FeatutedCollection/>
 
    </>
  )
}

export default Home