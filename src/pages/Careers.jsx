import React from 'react';

export default function Careers() {
  const jobs = [
  
    {
      title: "Campus Ambassador",
      responsibilities: [
       "SkillHigh is seeking proactive and enthusiastic individuals for a part-time internship as Campus Ambassadors." ,
       "Responsibilities include representing SkillHigh on your campus, promoting events, workshops, and programs, organizing campaigns to drive student participation, collaborating with student groups and faculty, and encouraging registrations and engagement in SkillHigh initiatives while providing feedback for improvement. ",
       "Ideal candidates should possess strong communication and leadership skills, be active in campus activities and social media, and demonstrate a proactive and organized approach. Benefits include a certificate, letter of recommendation, performance-based rewards, incentives, and professional networking opportunities."
      ],
      formLink: "https://forms.gle/2BikP5Z1KgdFWc7v8", 
    },
    {
      title: "Business Development Manager",
      responsibilities: [
        "Generate high-quality leads through cold calling and the B2C channel, leveraging experience to convert them into valuable clients.",
        "Effectively onboard campus ambassadors from colleges, manage their performance, and ensure strategic engagement.",
        "Utilize 1+ year of business development experience to achieve continuous revenue growth and contribute significantly to company success.",
        "Build, manage, and motivate a high-performing team, showcasing strong leadership and team-handling capabilities.",
        "Cultivate strategic B2B partnerships and maintain robust corporate relationships to expand business opportunities.",
        "Identify and implement innovative sales and marketing strategies, driving maximum results in a competitive market.",
        "Provide career guidance to students, ensuring they receive valuable insights for shaping their futures.",
        "Meet requirements of minimum 60% in 10th, 12th, and graduation, combined with proven experience, exceptional communication skills, resilience, and a dynamic work ethic.",
      ],
      formLink: "https://forms.gle/WEWcNqqvtv4YUfEb9", 
    },
    {
      title: "Business Development Associate",
      responsibilities: [
        "Generate high-quality leads through cold calling and the B2C channel, converting them into valuable clients.",
        "Onboard campus ambassadors from colleges, manage their performance, and drive strategic engagement.",
        "Achieve continuous revenue growth, contributing to the overall success of the company.",
        "Build and lead a motivated team, showcasing exceptional leadership skills.",
        "Foster strategic B2B partnerships and cultivate strong corporate relationships.",
        "Explore and implement innovative channels to maximize business opportunities in sales and marketing.",
        "Assist students in shaping their careers through effective counseling and guidance.",
        "Meet requirements of minimum 60% in 10th, 12th, and graduation, exceptional communication skills, resilience, goal orientation, and the ability to thrive in a dynamic environment.",
      ],
      formLink: "https://forms.gle/j4znEfuKg6hNsKyt6", 
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-inter">
      <h1 className="text-3xl font-bold text-left text-main mb-8">Careers</h1>
      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{job.title}</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {job.responsibilities.map((responsibility, i) => (
                <li key={i}>{responsibility}</li>
              ))}
            </ul>
            <div className="text-right mt-6">
              <a
                href={job.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-main text-white px-6 py-2 rounded-md focus:ring focus:ring-green-800"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
