import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Adobe from '../assets/Adobe.png';
import CSB from '../assets/CSB.png';
import IBM from '../assets/IBM.png';
import Cisco from '../assets/Cisco.png';
import ESB from '../assets/ESB.png';
import InformationTechnology from '../assets/InformationTechnology.png';
import Microsoft from '../assets/Microsoft.png';
import Intuit from '../assets/Intuit.png';
import Autodesk from '../assets/Autodesk.png';

export default function CertificatePartners() {
  const partners = [
    { name: 'Adobe', logo: Adobe },
    { name: 'CSB', logo: CSB },
    { name: 'IBM', logo: IBM },
    { name: 'Cisco', logo: Cisco },
    { name: 'ESB', logo: ESB },
    { name: 'InformationTechnology', logo: InformationTechnology },
    { name: 'Microsoft', logo: Microsoft },
    { name: 'Intuit', logo: Intuit },
    { name: 'Autodesk', logo: Autodesk },


  ];

  return (
    <div className="certificate-partners py-12 bg-gray-100">
      <h2 className="font-bold font-inter text-headings text-2xl sm:text-3xl lg:text-4xl text-center mb-8">
        Our Certification Partners
      </h2>
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <div className="p-4 flex w-[300px] justify-center items-center text-center transition-all duration-300 transform hover:scale-110 hover:shadow-xl  rounded-lg">
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo max-w-full h-auto object-contain mb-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
