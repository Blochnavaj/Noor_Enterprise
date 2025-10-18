import React from 'react'
import Hero from '../Components/Layout/Hero'
import ItemsCollection from '../Components/Products/ItemsCollection'
import NewArrivalSection from '../Components/Products/NewArrivalSection'
import TopBar from '../Components/Layout/TopBar'

function Home() {
  return (
    <> 
    <Hero/>
    <TopBar/>
    {/* <ItemsCollection/> */}
    <NewArrivalSection/>
    </>
  )
}

export default Home