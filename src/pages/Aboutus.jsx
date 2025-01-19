import React,{useEffect} from 'react'
import { AboutHero } from '../components/AboutHero'
import About_Join from '../components/About_Join'
import VisionMission from '../components/VisionMission'
import About_Mentors from '../components/About_Mentors'
import ContactUs from '../components/ContactUs'

export default function 
() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <AboutHero/>
        <About_Join/>
        <VisionMission/>
        <About_Mentors/>
        <ContactUs/>
    </div>
  )
}
