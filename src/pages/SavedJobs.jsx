import { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';

const SavedJobs = () => {
  const { savedJobs } = useContext(JobContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Your Saved Jobs</h2>
      
      {savedJobs.length === 0 ? (
        <h4 className="text-center mt-5 text-muted">Aapne abhi tak koi job save nahi ki hai.</h4>
      ) : (
        <div className="row">
          {savedJobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;