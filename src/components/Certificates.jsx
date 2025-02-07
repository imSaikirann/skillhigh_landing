import React, { useState } from "react";
import { motion } from "framer-motion";
import Appreciation from "../assets/images/certificates/certificate_of_appreciation.png";
import IndustrialTraining from "../assets/images/certificates/certificate_of_industrail_training.png";
import GoldBlueProfessional from "../assets/images/certificates/Gold_Blue_Professional_Seminar_Certificate.png";
import MicrosoftCertification from "../assets/images/certificates/certificate_of_microsoftcertification.png";

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState("appreciation");

  const images = {
    appreciation: Appreciation,
    training: IndustrialTraining,
    seminar: GoldBlueProfessional,
    microsoft: MicrosoftCertification,
  };

  const certificates = [
    { key: "appreciation", label: "Certificate of Appreciation" },
    { key: "training", label: "Industrial Training Certificate" },
    { key: "seminar", label: "Internship Completion Certificate" },
    { key: "microsoft", label: "Microsoft Certification" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-inter px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row gap-8 p-6 md:p-10 bg-white shadow-2xl rounded-3xl w-full max-w-6xl"
      >
        {/* Left Section: Buttons */}
        <motion.div
          className="flex flex-col gap-4 md:gap-6 w-full md:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold  text-center text-gray-800">
            Our Certificates
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base text-center mb-4">
            Click to view the certificate details.
          </p>
          {certificates.map((cert) => (
            <motion.button
              key={cert.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(cert.key)}
              className={`py-2 md:py-3 px-4 md:px-6 rounded-xl shadow-md text-base md:text-lg font-medium transition-all ${
                selectedImage === cert.key
                  ? "bg-main text-white"
                  : "bg-white text-main border-2 "
              }`}
            >
              {cert.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Right Section: Image Display */}
        <motion.div
          className="flex justify-center items-center border-2 border-green-500 rounded-2xl p-4 md:p-6 bg-green-50 shadow-inner w-full md:w-2/3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={images[selectedImage]}
            alt={certificates.find((cert) => cert.key === selectedImage)?.label}
            className="max-w-full max-h-[90vh] h-auto rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
