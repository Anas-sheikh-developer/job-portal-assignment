import { useState, useEffect, useContext } from 'react';
import JobCard from '../components/JobCard';
import { JobContext } from '../context/JobContext';

const Home = () => {
  const [apiJobs, setApiJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const { customJobs } = useContext(JobContext); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://remotive.com/api/remote-jobs?limit=20');
        const data = await response.json();
        setApiJobs(data.jobs); 
        setError(null);
      } catch (err) {
        setError('Jobs load karne mein masla aa raha hai.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Dono jobs ko mila liya
 const allJobs = [...(customJobs || []), ...(apiJobs || [])];

  // Filter Logic
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = job.candidate_required_location 
      ? job.candidate_required_location.toLowerCase().includes(filterLocation.toLowerCase()) 
      : true;
    return matchesSearch && matchesLocation;
  });

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <h2 className="text-center mt-5 text-danger">{error}</h2>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Find Your Dream Job</h2>
      
      {/* Search aur Filter Bar */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search by job title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-5 mb-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Filter by location (e.g. USA, Remote)..." 
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <h4 className="text-center mt-5 text-muted">No jobs found matching your criteria.</h4>
      ) : (
        <div className="row">
          {filteredJobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;