import React, { useState } from 'react';
import Pattern from '../assets/patternMask.png';
import { useEffect } from 'react';
import axios from '../auth/axiosConfig';

export default function FQA() {
  const [faqs, setfaqs] = useState([]);

  useEffect(() => {
    async function fetchFAQS() {
      try {
        const res = await axios('/api/v1/faqs/allFAQs');


          setfaqs(res.data.allFAQs);
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchFAQS();
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <img
        src={Pattern}
        alt="Background"
        className="h-[760px] md:h-[900px] lg:h-[900px] w-full object-cover"
      />

      {/* Updated: Remove blur effect from overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
      <div className="absolute inset-0 bg-gradient-to-l from-white to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />

      {/* Content wrapper for the FAQ section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-10 lg:p-20 space-y-6">
        <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-headings text-center">
          Frequently Asked Questions
        </h2>

        <div className="w-full max-w-xl md:max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 md:px-6 md:py-4 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <span className="text-md md:text-lg font-medium text-gray-700">
                    {faq.question}
                  </span>
                  <span
                    className={`text-xl font-bold transform transition-transform duration-500 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    {openIndex === index ? '-' : '+'}
                  </span>
                </div>
              </button>
              {openIndex === index && (
                <div
                  className="px-4 py-3 md:px-6 md:py-4 bg-white text-gray-600 transition-all duration-500 ease-in-out transform origin-top"
                  style={{
                    maxHeight: openIndex === index ? '300px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                    transform: openIndex === index ? 'scaleY(1)' : 'scaleY(0)',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Updated: Remove additional gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
    </div>
  );
}
