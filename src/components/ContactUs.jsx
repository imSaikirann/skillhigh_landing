import React, { useState } from 'react';
import axios from '../services/axiosConfig';

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
    <div className="flex flex-col lg:flex-row justify-around items-center p-3 md:p-6  font-inter">
      {/* Intro Text */}
      <div className="lg:w-1/3 mb-8 lg:mb-0 lg:text-left">
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
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-lg bg-white rounded-lg border border-gray-300 p-8 space-y-6">
        <h2 className="text-4xl font-bold text-left text-headings">Contact Us</h2>
        <p className="text-textColor font-medium text-left">We'd love to hear from you! Please fill out the form below.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
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
              <label className="block  text-textColor font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div>
            <label className="block  text-textColor font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="block  text-textColor font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            style={gradientStyle}
            className="w-full px-4 py-3 text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-border transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-md hover:shadow-lg "
            
    
          >
            Send Message
          </button>
        </form>

        {formStatus.message && (
          <p className={`mt-4 font-semibold font-inter text-center ${formStatus.success ? 'text-main' : 'text-red-600'}`}>
            {formStatus.message}
          </p>
        )}
      </div>
    </div>
  );
}
