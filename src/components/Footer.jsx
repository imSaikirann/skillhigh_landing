import React from 'react';
import Logo from '../assets/logo.jpg';
import PP from '../assets/PRIVACY_POLICY.pdf'
import TC from '../assets/TermsandConditions.pdf'


export default function Footer() {
  const handlePP = ()=>{
    window.open(PP, "_blank");
  }
  const handleTC = ()=>{
    window.open(TC, "_blank");
  }
  return (
    <footer className="bg-white text-black py-10 border-t-2 font-inter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About Section */}
          <div className='flex flex-col'>
            <div className='flex flex-col items-center'>
              <img src={Logo} className="h-auto w-[200px] mr-2" alt="Skill High Logo" />
              <p className='text-left'>Grow and Learn</p>
            </div>
            {/* Uncomment if you want to show social links
            <div>
              <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-black hover:text-blue-600" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" className="text-black hover:text-blue-400" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" className="text-black hover:text-blue-700" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://instagram.com" className="text-black hover:text-pink-500" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div> */}
          </div>

          {/* About Us Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-700 text-md text-justify"  style={{ hyphens: "auto", wordBreak: "break-word", wordSpacing: "0.03em" }}>
              We are dedicated to providing high-quality content and services. Join us to enhance your skills and explore new opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-700 space-y-2">
              <li><a href="/aboutus" className="hover:text-main">About</a></li>
              <li><a href="/careers" className="hover:text-main">Careers</a></li>
              <li><a href="/allcourses" className="hover:text-main">Courses</a></li>
              <li><a href="/contactus" className="hover:text-main">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className=' text-justify'  style={{ hyphens: "auto", wordBreak: "break-word", wordSpacing: "0.03em" }}>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <ul className="text-gray-700 space-y-2 justify-normal">
              <li>Email: <a href="mailto:admin@skillhigh.in" className="hover:text-main">admin@skillhigh.in</a></li>
              <li>Phone: 9182661204</li>
              <li>Address: P.No: 169, First Floor. 
Woods Enclave, Woods Central Park, Suchitra Sub Post, Pet Basheerabad, 
Suchitra Junction, Quthbullapur, Medchal-Malkajgiri Dist., Telangana, India 
500067.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="flex space-x-4">
              <a onClick={handlePP} className="hover:text-main cursor-pointer">Privacy Policy</a>
              <span>|</span>
              <a onClick={handleTC} className="hover:text-main cursor-pointer">Terms & Conditions</a>
              {/* <span>|</span>
              <a href="/refund-and-cancellation" className="hover:text-main">Refund and Cancellation</a>
              <span>|</span>
              <a href="/shipping-and-delivery" className="hover:text-main">Shipping and Delivery</a> */}
            </div>
            <p className="mt-4 md:mt-0 text-gray-400">
              &copy; {new Date().getFullYear()} Skill High. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
