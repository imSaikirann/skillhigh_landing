import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosConfig';
import Icon from '../assets/icon.png'
import Spinner from '../components/Spinner';
import { AppContext } from '../store/StoreContext';

export default function CheckoutPage() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true)
  const { pricingList } = useContext(AppContext)

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const { id } = useParams();
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [pricingPlans, setPricingPlans] = useState([]);

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  // Fetch pricing data
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


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSelectPlan = (planName) => {
    console.log(planName)
    setSelectedPlan(planName);
    setShowPlanModal(true);
  };

  const handleClosePlanModal = () => {
    setShowPlanModal(false);
  };

  const handleOpenCheckoutModal = () => {
    setShowCheckoutModal(true);
    setShowPlanModal(false);
  };

  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined })); // Clear the error for this field
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Check if name is empty
    if (!userInfo.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Check if email is empty or invalid
    if (!userInfo.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = 'Valid email is required.';
    }

    // Check if phone number is empty or invalid
    if (!userInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(userInfo.phone)) {
      newErrors.phone = 'Valid phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };


  const handleCheckout = async () => {
    if (!validateForm()) return;

    setProcessing(true)
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setCheckoutError('Failed to load Razorpay SDK. Please refresh the page.');
      return;
    }

    try {
      
      const payload = {
        courseId: id,
        price: pricingList.find(plan => plan.pricingName === selectedPlan).price,
        phone: userInfo.phone,
        email: userInfo.email,
      };

     
      const response = await axios.post('/api/v1/payments/createOrder', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const { orderId, amount, currency } = response.data;

    
      const options = {
        key: import.meta.env.VITE_RAZORPAY_LIVE_ID,
        amount,
        currency,
        order_id: orderId,
        name: 'course',
        description: `Purchase of ${selectedPlan} plan`,
        image: Icon,
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: '#0D8267',
        },
        handler: async (response) => {

          setSuccessMessage(
            'Payment successful! Your course purchase is confirmed. Check your Profile for further details.'
          );
          setCheckoutError('');
          console.log('Payment Successful:', response);

          // Optional: Verify payment server-side
          try {
            await axios.post('/api/v1/payments/verifyPayment', {
              courseId: id,
              phone: userInfo.phone,
              email: userInfo.email,
              price: pricingList.find(plan => plan.pricingName === selectedPlan).price,
              orderId,
              paymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
          } catch (err) {
            console.error('Payment verification failed:', err);
            setCheckoutError('Payment verification failed. Please contact support.');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Payment failure handler
      rzp.on('payment.failed', (response) => {
        setCheckoutError(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error(error);
      setCheckoutError('Something went wrong during checkout.');

    }
    finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/v1/courses/getSingleCourse/${id}`);

        setSelectedCourse(response.data)
        setLoading(false)
      } catch (err) {
        console.error(err);
        setLoading(false)
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-inter">
      <h1 className="text-4xl font-bold text-center md:text-left text-headings">Checkout</h1>
      <p className="text-center md:text-left text-textColor font-medium mt-2">Select your plan and explore its features.</p>
      {/* <div className="text-center text-2xl text-main font-bold mt-2">Course Name : {selectedCourse.courseName && selectedCourse.courseName}</div> */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {pricingList.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800">{plan.pricingName}</h2>
            <p className="text-gray-600 mt-2">One-time payment</p>
            <p className="text-4xl font-bold text-main mt-4">
              {plan.price} <span className="text-lg font-medium">INR</span>
            </p>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                onClick={() => handleSelectPlan(plan.pricingName)}
                style={gradientStyle}
                className="text-white px-6 py-2 rounded-md transition"
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Details Modal */}
      {showPlanModal && selectedPlan && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800">{selectedPlan} Plan</h2>
    
      {showPlanModal && selectedPlan && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800">{selectedPlan} Plan</h2>
    
      {pricingList.length > 0 ? (
     
        (() => {
          const plan = pricingList.find(plan => plan.pricingName === selectedPlan);
        
          return plan ? (
            <>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    - {feature.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-row-reverse justify-between">
                <button
                  onClick={handleOpenCheckoutModal}
                  style={gradientStyle}
                  className="text-white px-6 py-2 rounded-md transition"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleClosePlanModal}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-600">Selected plan not found.</p>
          );
        })()
      ) : (
        <p className="text-red-600">No pricing plans available.</p>
      )}
    </div>
  </div>
)}

    </div>
  </div>
)}


      {/* Checkout Form Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
            {successMessage ? (
              <div className="text-center">
                <div className="p-5 bg-green-100 border border-green-400 text-green-800 rounded-lg">
                  <h2 className="text-3xl font-bold mb-3">Success!</h2>
                  <p className="text-lg mb-3">{successMessage}</p>
                  <p className="text-gray-600">
                    You have successfully purchased the courses. Please check your Profile.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="bg-main text-white px-5 py-2 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Enter Your Details</h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="border border-gray-300 rounded-lg w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                      value={userInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-8 flex flex-row-reverse items-center justify-between">
                  <button
                    style={gradientStyle}
                    onClick={handleCheckout}
                    className="text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <span className="loader mr-2"></span>
                    ) : (
                      <span>Proceed to Checkout</span>
                    )}
                  </button>

                  {checkoutError && <p className="text-sm text-red-600">{checkoutError}</p>}
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
