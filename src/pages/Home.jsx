import React from 'react'
import Hero from '../components/Hero'
import ContactUs from '../components/ContactUs'
import FQA from '../components/FQA'
import Hero2 from '../components/Hero2'
import Choose from '../components/Choose'
import Needhelp from '../components/Needhelp'
import TestimonialSlider from '../components/Testimonial'
import Mentors from '../components/Mentors'
import Carousel from '../components/CourseCarousal'


function Home() {
  return (
    <>
    <Hero/>
    <Hero2/>
    <Choose/>
    <Carousel/>
    <Needhelp/>
    <FQA/>
    <TestimonialSlider/>
    <Mentors/>
    <ContactUs/>

    </>
  )
}

export default Home