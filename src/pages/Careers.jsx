import React, { useEffect, useState } from 'react';
import axios from '../config/apiClient';
import { WorkIcon, LocationIcon } from '../assets/icons/icons';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/v1/careers/allOpportunites');
        setJobs(response.data.additional || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load job postings. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center text-xl mt-10 animate-pulse">Loading job postings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-3 sm:p-8 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-4xl font-extrabold text-left text-main mb-10 mt-4">Careers</h1>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-600">No job postings available at the moment.</div>
      ) : (
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-8 border border-gray-200 transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{job.roleName}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{job.jobDescription}</p>
              <div className="flex flex-col md:flex-row items-start md:items-center text-sm text-gray-600 space-y-2 md:space-y-0 md:space-x-4 mb-6">
                <span className="flex items-center gap-3"><LocationIcon /> {job.location}</span>
                <span className="flex items-center gap-3"><WorkIcon /> {job.type}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Key Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.responsibilities.split('\n').map((responsibility, i) => (
                    <li key={i}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Qualifications & Requirements:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {job.requirements.split('\n').map((requirement, i) => (
                    <li key={i}>{requirement}</li>
                  ))}
                </ul>
              </div>

              <div className="text-right mt-8">
                <a
                  href={job.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main text-white px-8 py-3 rounded-3xl  transition-all"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
