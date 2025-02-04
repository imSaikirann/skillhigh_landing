import React, { useEffect, useState } from 'react';
import Wave from '../assets/wave.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../store/StoreContext';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CoursePricing() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const { courseId } = useContext(AppContext);
  const navigate = useNavigate();

  const [pricingPlans, setPricingPlans] = useState([]);

  const handleCourseCheckout = (id) => {
    navigate(`/course/checkout/${id}`);
  };

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await axios.get('/api/v1/pricings/allPricings');
        setPricingPlans(res.data.allpricings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlans();
  }, []);

  return (
    <div className="relative bg-white overflow-hidden mt-5">
      <img
        src={Wave}
        alt="Background Wave"
        className="w-full h-[1500px] md:h-[1000px] lg:h-[900px] object-cover"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-center justify-center text-black p-4 font-inter"
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-main">
            Specialized Learning Fee
          </h1>
          <p className="text-lg font-medium md:text-xl text-gray-700 mt-">
            Choose the perfect plan to kickstart your journey
          </p>
        </div>

        {/* Pricing Section */}
        <motion.div
          className="flex flex-col md:flex-row lg:flex-row gap-6 mt-12 items-center justify-center"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.pricingId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="w-[350px] bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center space-y-4"
            >
              <p className="text-lg font-bold text-textColor">
                {plan.pricingName}
              </p>
              <p className="text-5xl font-bold text-main">
                {plan.price} <span className="text-2xl font-medium">INR</span>
              </p>
              <p className="text-md text-gray-600 font-medium">
                {plan.pricingName === 'Self-Lead'
                  ? 'One-time payment for self-led access'
                  : 'Lifetime access with all features'}
              </p>
              <div className="text-left mt-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex font-medium items-center space-x-2">
                    <span
                      className={feature.isIncluded ? 'text-main' : 'text-red-200'}
                    >
                      {feature.isIncluded ? '✓' : '✗'}
                    </span>
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
              <button
                style={gradientStyle}
                onClick={() => handleCourseCheckout(courseId)}
                className="px-6 py-3 rounded-md font-medium mt-4 w-52"
              >
                Enroll now
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
