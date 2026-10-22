import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
           JobPortal
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-medium">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active text-primary" : "nav-link"} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active text-primary" : "nav-link"} to="/post-job">Post a Job</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? "nav-link active text-primary" : "nav-link"} to="/saved">Saved Jobs</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;