import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Course from "./pages/Course";
import Privacy from "./pages/Privacy";
import AllCourses from "./pages/AllCourses";
import TermsAndConditions from "./pages/Terms&Conditions";
import CheckoutPage from "./pages/Checkout";
import ProtectedRoute from "./pages/ProtectedRoutes";  
import ContactUs from "./pages/ContactUs";
import Careers from "./pages/Careers";
import Refund from "./pages/Refund";
import Shipping from "./pages/Shipping";

function App() {
  return (
    <div className="px-2 sm:px-[2vw] md:px-[4vw] lg:px-[6vw]">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-and-cancellation" element={<Refund />} />
        <Route path="/shipping-and-delivery" element={<Shipping />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />

        {/* Protected Routes */}
        <Route
          path="/course/checkout/:id"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route (catch-all) */}
        <Route path="*" element={<Signin />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
