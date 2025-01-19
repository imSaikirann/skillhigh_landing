import React, { useState } from "react";
import Appreciation from "../assets/certificate_of_appreciation.png";
import IndustrialTraining from "../assets/certificate_of_industrail_training.png";
import GoldBlueProfessional from "../assets/Gold_Blue_Professional_Seminar_Certificate.png";

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState("appreciation");

  const images = {
    appreciation: Appreciation,
    training: IndustrialTraining,
    seminar: GoldBlueProfessional,
  };

  const certificates = [
    { key: "appreciation", label: "Certificate of Appreciation" },
    { key: "training", label: "Industrial Training Certificate" },
    { key: "seminar", label: "Internship Completion Certificate" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen  font-inter px-4">
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 bg-white shadow-2xl rounded-3xl w-full max-w-6xl">
        {/* Left Section: Buttons */}
        <div className="flex flex-col gap-4 md:gap-6 w-full md:w-1/3">
          <h2 className="text-2xl md:text-4xl font-bold text-headings text-center">
            Our Certificates
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base text-center mb-4">
            Click to view the certificate details.
          </p>
          {certificates.map((cert) => (
            <button
              key={cert.key}
              onClick={() => setSelectedImage(cert.key)}
              className={`py-2 md:py-3 px-4 md:px-6 rounded-xl shadow-md text-base md:text-lg font-medium transition-all hover:scale-105 ${
                selectedImage === cert.key
                  ? "bg-main text-white"
                  : "bg-white text-main border-2 border-main"
              }`}
            >
              {cert.label}
            </button>
          ))}
        </div>

        {/* Right Section: Image Display */}
        <div className="flex justify-center items-center border-2 border-green-500 rounded-2xl p-4 md:p-6 bg-green-50 shadow-inner w-full md:w-2/3">
          <img
            src={images[selectedImage]}
            alt={certificates.find((cert) => cert.key === selectedImage)?.label}
            className="max-w-full max-h-[90vh] h-auto rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
