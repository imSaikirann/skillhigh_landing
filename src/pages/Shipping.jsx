import React from 'react';

export default function Shipping() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Shipping and Delivery Policy</h1>
      <p className="mb-4">
        At SkillHigh, we strive to ensure that students receive their certification copies in a timely and efficient manner. Our Shipping and Delivery Policy outlines the terms and procedures related to the shipment of physical certificates.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Delivery Scope</h2>
        <ul className="list-disc pl-6">
          <li>Physical certificates are shipped only upon request from students during the course completion process.</li>
          <li>The shipping service is available for addresses within India.</li>
        </ul>

        <h2 className="text-2xl font-semibold">2. Shipping Fees</h2>
        <ul className="list-disc pl-6">
          <li>Domestic Shipping: A nominal fee will be charged for delivery within India, based on the shipping address.</li>
        </ul>

        <h2 className="text-2xl font-semibold">3. Processing Time</h2>
        <ul className="list-disc pl-6">
          <li>Once a request for a physical certificate is received, it will be processed within 7-10 business days from the date of request.</li>
          <li>Students will be notified via email once their certificate is dispatched.</li>
        </ul>

        <h2 className="text-2xl font-semibold">4. Delivery Time</h2>
        <ul className="list-disc pl-6">
          <li>Delivery times may vary based on the location:</li>
          <ul className="list-disc pl-8">
            <li>Domestic: 5-7 business days after dispatch.</li>
            <li>International: 10-15 business days after dispatch.</li>
          </ul>
        </ul>

        <h2 className="text-2xl font-semibold">5. Shipping Partners</h2>
        <ul className="list-disc pl-6">
          <li>We collaborate with reliable courier services to ensure prompt and safe delivery of certificates.</li>
        </ul>

        <h2 className="text-2xl font-semibold">6. Tracking Information</h2>
        <ul className="list-disc pl-6">
          <li>A tracking ID will be provided to the student via email once the shipment is dispatched, allowing them to monitor the delivery status.</li>
        </ul>

        <h2 className="text-2xl font-semibold">7. Return and Reissue Policy</h2>
        <ul className="list-disc pl-6">
          <li>If a certificate is damaged or lost during transit, we will reissue it at no extra cost. Proof of damage (e.g., photos) must be submitted within 7 days of receiving the shipment.</li>
          <li>For incorrect address submissions or failed deliveries, additional charges may apply for reshipping.</li>
        </ul>

        <h2 className="text-2xl font-semibold">8. Student Responsibilities</h2>
        <ul className="list-disc pl-6">
          <li>Students must ensure that the shipping address provided during the request process is accurate and complete.</li>
          <li>Any address changes must be communicated within 24 hours of the request submission.</li>
        </ul>

        <h2 className="text-2xl font-semibold">9. Contact for Support</h2>
        <ul className="list-disc pl-6">
          <li>For any queries related to shipping and delivery, please reach out to our support team at:</li>
          <ul className="list-disc pl-8">
            <li>Email: <a href="mailto:admin@skillhigh.in" className="text-blue-500">admin@skillhigh.in</a></li>
            <li>Phone: +91-9182661204</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
