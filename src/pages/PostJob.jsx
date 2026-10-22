import { useState, useContext } from 'react'; 
import { JobContext } from '../context/JobContext'; 

const PostJob = () => {
  const { addNewJob } = useContext(JobContext); 

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addNewJob(formData); 
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ title: '', company: '', location: '', description: '' }); 
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold mb-4 text-center">Post a New Job</h3>
              
              {isSubmitted && (
                <div className="alert alert-success text-center border-0 shadow-sm">
                  ✅ Job posted successfully! Check Home Page.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    name="title" 
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                    id="title"
                    placeholder="Job Title"
                    value={formData.title} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="title">Job Title *</label>
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    name="company" 
                    className={`form-control ${errors.company ? 'is-invalid' : ''}`} 
                    id="company"
                    placeholder="Company Name"
                    value={formData.company} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="company">Company Name *</label>
                  {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    name="location" 
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`} 
                    id="location"
                    placeholder="Location"
                    value={formData.location} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="location">Location (e.g. Remote, USA) *</label>
                  {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                </div>

                <div className="form-floating mb-4">
                  <textarea 
                    name="description" 
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                    id="description"
                    placeholder="Job Description"
                    style={{ height: '150px' }}
                    value={formData.description} 
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="description">Job Description *</label>
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 fw-medium">
                  Publish Job
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;