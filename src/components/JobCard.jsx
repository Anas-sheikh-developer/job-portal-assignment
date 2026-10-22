import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const JobCard = ({ job }) => {
  const { addJob, savedJobs } = useContext(JobContext);
  const isSaved = savedJobs.find((j) => j.id === job.id);

  // Company ke naam ka pehla letter nikalne ke liye
  const companyInitial = job.company_name ? job.company_name.charAt(0).toUpperCase() : 'C';

  return (
    <div className="card h-100 job-card shadow-sm border-0">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          {/* Company Logo Placeholder */}
          <div 
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3" 
            style={{ width: '50px', height: '50px', fontSize: '1.2rem', fontWeight: 'bold' }}
          >
            {companyInitial}
          </div>
          <div>
            <h5 className="card-title mb-0 text-truncate" style={{ maxWidth: '200px' }} title={job.title}>
              {job.title}
            </h5>
            <small className="text-muted">{job.company_name}</small>
          </div>
        </div>

        <div className="mb-4 mt-2">
          <span className="badge bg-light text-dark border me-2 mb-2">
            📍 {job.candidate_required_location || 'Remote'}
          </span>
          <span className="badge bg-light text-dark border mb-2 text-capitalize">
            💼 {job.job_type || 'Full Time'}
          </span>
        </div>
        
        <div className="mt-auto d-flex gap-2">
          <Link to={`/job/${job.id}`} state={{ job }} className="btn btn-outline-primary w-50 btn-sm fw-medium">
            Details
          </Link>
          <button 
            className={`btn w-50 btn-sm fw-medium ${isSaved ? 'btn-success' : 'btn-primary'}`}
            onClick={() => addJob(job)}
            disabled={isSaved}
          >
            {isSaved ? 'Saved ✓' : 'Save Job'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;