import React from 'react'
import Contact from '../components/home/Contact'
import About from '../components/home/About'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testamonials'
import Choose from '../components/home/Choose'
import FarmingSolutions from './FarmingSolutions'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Yojana from '../components/home/Yojana'
import FarmerGrowthChart from '../components/home/FarmerGrowthChart'



function Home() {
  
  return (
    <div className=''>
      <Hero/>
      <FarmingSolutions/>
      {/* <About/> */}
      <Choose/>
      {/* <HowItWorks/> */}
      <Yojana/>
      <FarmerGrowthChart/>
      <Contact/>
      
      <Testimonials/>
    </div>
  )
}

export default Home