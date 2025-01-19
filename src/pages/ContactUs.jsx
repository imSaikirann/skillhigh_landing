import React, { useState } from 'react';
import axios from '../auth/axiosConfig';

export default function ContactUs() {
  const gradientStyle = {
    background: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' && !/^\d*$/.test(value)) return; // Only allow numbers for phone
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    if (!name.trim()) return 'Name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.';
    if (!phone.trim() || phone.length !== 10) return 'Phone number must be 10 digits.';
    if (!message.trim()) return 'Message is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setFormStatus({ success: false, message: errorMessage });
      setTimeout(() => setFormStatus({ success: false, message: '' }), 3000);
      return;
    }

    try {
      const response = await axios.post('/api/v1/contacts/contactus', formData);
      if (response.status === 201) {
        setFormStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus({ success: false, message: 'Something went wrong!' });
      }
    } catch (error) {
      setFormStatus({ success: false, message: 'Internal server error. Try again later.' });
    }

    setTimeout(() => setFormStatus({ success: false, message: '' }), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6 rounded-lg shadow-md font-inter">
      {/* Left Section */}
      <div style={gradientStyle} className="lg:w-1/2 rounded-l-md p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg mb-6 text-center">
          Have questions? Our team is here to assist you in making the right choice.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 bg-white p-8 rounded-r-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mb-6">We'd love to hear from you! Fill out the form below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
              aria-label="Name"
            />
            <label className="absolute left-3 top-0 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 transition-all">
              Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
              aria-label="Email"
            />
            <label className="absolute left-3 top-0 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
              aria-label="Phone"
            />
            <label className="absolute left-3 top-0 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 transition-all">
              Phone
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              rows="4"
              className="peer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
              aria-label="Message"
            ></textarea>
            <label className="absolute left-3 top-0 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 transition-all">
              Message
            </label>
          </div>

          <button
          style={gradientStyle}
            type="submit"
            className="w-full  text-white py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring focus:ring-emerald-300"
          >
            Send Message
          </button>
        </form>

        {formStatus.message && (
          <div
            className={`mt-4 text-center py-2 rounded-lg ${
              formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {formStatus.message}
          </div>
        )}
      </div>
    </div>
  );
}
