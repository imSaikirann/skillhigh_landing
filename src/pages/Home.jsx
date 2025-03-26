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
import CertificatePartners from '../components/CertificatePartners'
import ApprovalTag from '../components/ApprovalTag'
import Timeline from '../components/Timeline'


function Home() {
  return (
    <>
    <Hero/>
    <CertificatePartners/>
    <Hero2/>
    <ApprovalTag/>
    <Choose/>
    <Carousel/>
    <Timeline/>
    <Needhelp/>
    <FQA/>
    <TestimonialSlider/>
    <Mentors/>
    <ContactUs/>

    </>
  )
}

export default Home