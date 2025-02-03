import React, { useState } from 'react';
import { motion } from 'framer-motion';  // Import motion for animations
import axios from '../config/apiClient';

const gradientStyle = {
  backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
  color: 'white',
  textAlign: 'center',
};

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone field, restrict to numeric input only
    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;

    if (!name.trim()) return 'Name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!phone.trim()) return 'Phone number is required.';
    if (phone.length !== 10) return 'Phone number must be exactly 10 digits.';
    if (!message.trim()) return 'Message is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();
    if (errorMessage) {
      setFormStatus({ success: false, message: errorMessage });
      // Remove the alert after 3 seconds
      setTimeout(() => {
        setFormStatus({ success: false, message: '' });
      }, 3000);
      return;
    }

    try {
      const response = await axios.post('/api/v1/contacts/addContact', formData);

      if (response.status === 201) {
        setFormStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus({
          success: false,
          message: response.data.errors?.[0]?.message || 'Something went wrong!',
        });
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: error.response?.data?.error || 'Internal server error. Please try again later.',
      });
    }

    // Remove the alert after 3 seconds
    setTimeout(() => {
      setFormStatus({ success: false, message: '' });
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-around items-center p-3 md:p-6 font-inter">
      {/* Intro Text */}
      <motion.div
        className="lg:w-1/3 mb-8 lg:mb-0 lg:text-left"
        initial={{ opacity: 0, x: -50 }}  // Start from the left and fade in
        animate={{ opacity: 1, x: 0 }}    // Slide in to original position
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        viewport={{ once: true }}        // Trigger animation when entering the viewport
      >
        <h1
          className="text-5xl font-bold text-gray-800 mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
            backgroundSize: '100%',
            backgroundRepeat: 'repeat',
          }}
        >
          Get in touch
        </h1>
        <p className="text-textColor font-medium">
          Have questions or need assistance? Our team is here to help you make the right choice for your career.
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="w-full max-w-lg bg-white rounded-lg border border-gray-300 p-8 space-y-6"
        initial={{ opacity: 0, y: 50 }}  // Start below and fade in
        animate={{ opacity: 1, y: 0 }}    // Slide up into position
        transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
        viewport={{ once: true }}        // Trigger animation when entering the viewport
      >
        <h2 className="text-4xl font-bold text-left text-headings">Contact Us</h2>
        <p className="text-textColor font-medium text-left">We'd love to hear from you! Please fill out the form below.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            className="flex flex-col sm:flex-row sm:space-x-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full sm:w-1/2">
              <label className="block text-textColor font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
                placeholder="Your Name"
              />
            </div>

            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <label className="block text-textColor font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
                placeholder="Your Email"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <label className="block text-textColor font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Phone Number"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <label className="block text-textColor font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            style={gradientStyle}
            className="w-full px-4 py-3 text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-border transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-md hover:shadow-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            Send Message
          </motion.button>
        </form>

        {formStatus.message && (
          <motion.p
            className={`mt-4 font-semibold text-center ${formStatus.success ? 'text-main' : 'text-red-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {formStatus.message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
