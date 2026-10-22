import { useLocation, useNavigate } from 'react-router-dom';

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <h2>Job Not Found!</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <button className="btn btn-link text-decoration-none text-secondary px-0 mb-3" onClick={() => navigate(-1)}>
        ← Back to Jobs
      </button>

      <div className="row">
        {/* Left Side: Job Description */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm p-4 p-md-5">
            <h1 className="fw-bold mb-2">{job.title}</h1>
            <h5 className="text-muted mb-4">{job.company_name}</h5>
            
            <div className="d-flex flex-wrap gap-3 mb-4">
              <span className="badge bg-light text-dark border p-2">📍 {job.candidate_required_location || 'Remote'}</span>
              <span className="badge bg-light text-dark border p-2 text-capitalize">💼 {job.job_type || 'Full Time'}</span>
            </div>

            <hr className="mb-4" />
            
            <h4 className="mb-3 fw-semibold">Job Description</h4>
            <div 
              className="text-secondary" 
              style={{ lineHeight: '1.8', fontSize: '1.05rem' }}
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>
          </div>
        </div>

        {/* Right Side: Apply Box */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-3">Job Overview</h5>
            <ul className="list-unstyled text-muted mb-4">
              <li className="mb-2"><strong>Role:</strong> {job.title}</li>
              <li className="mb-2"><strong>Company:</strong> {job.company_name}</li>
              <li className="mb-2"><strong>Location:</strong> {job.candidate_required_location || 'Remote'}</li>
            </ul>
            <a href={job.url} target="_blank" rel="noreferrer" className="btn btn-primary w-100 py-2 fw-medium">
              Apply Now 🚀
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;