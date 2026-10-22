import { createContext, useState, useEffect } from 'react';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  // Saved Jobs State
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  // Custom Jobs State (Form se add hone wali)
  const [customJobs, setCustomJobs] = useState(() => {
    const savedCustom = localStorage.getItem('customJobs');
    return savedCustom ? JSON.parse(savedCustom) : [];
  });

  // Jab bhi state change ho, localStorage update karo
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    localStorage.setItem('customJobs', JSON.stringify(customJobs));
  }, [savedJobs, customJobs]);

  const addJob = (job) => {
    if (!savedJobs.find((j) => j.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const removeJob = (id) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const addNewJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      company_name: job.company,
      candidate_required_location: job.location,
      job_type: 'Full Time',
      description: `<p>${job.description}</p>`
    };
    setCustomJobs([newJob, ...customJobs]);
  };

  return (
    <JobContext.Provider value={{ savedJobs, addJob, removeJob, customJobs, addNewJob }}>
      {children}
    </JobContext.Provider>
  );
};