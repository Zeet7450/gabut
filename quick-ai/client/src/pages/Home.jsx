import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import Terstimonial from '../components/Testimonial' 
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='gradient-dark min-h-screen'>
      <Navbar />
      <Hero />
      <AiTools />
      <Terstimonial />
      <Plan />
      <Footer />
    </div>
  )
}

export default Home
