import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * Renders header navigation links dynamically based on user authentication status.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if token exists in localStorage to determine login state
  const token = localStorage.getItem('token');

  // Handle User Logout action
  const handleLogout = () => {
    // Remove stored JWT token and user details from browser local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    
    // Redirect user to login page after logging out
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🎓 Student Manager
      </Link>

      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>

        {token ? (
          // Authenticated Navigation Links
          <>
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/students" 
              className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`}
            >
              Students
            </Link>
            <Link 
              to="/students/add" 
              className={`nav-link ${location.pathname === '/students/add' ? 'active' : ''}`}
            >
              Add Student
            </Link>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          // Public Guest Navigation Links
          <>
            <Link 
              to="/login" 
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
