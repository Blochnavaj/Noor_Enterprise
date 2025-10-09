import React from 'react'
import Marquee from "react-fast-marquee";

function TopBar() {

  const messages = [
  "🔥 Big Festive Sale Live Now! Get Flat 50% OFF on all products + Extra 10% Instant Discount on prepaid orders 💳",
  "🚚 Enjoy FREE Home Delivery across India — shop from the comfort of your home!",
  "🎁 Get exclusive rewards and discount coupons on your first purchase",
];

  return (
   <Marquee speed={100} gradient={false} className='bg-red-400'  >
  {messages.map((msg, i) => (
    <span  className='text-white' key={i} style={{ marginRight: "50px" , }}>
      {msg}
    </span>
  ))}
</Marquee>

  )
}

export default TopBar