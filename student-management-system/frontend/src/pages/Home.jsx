import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page Component
 * Serves as the landing hero page of the Student Management System application.
 */
const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#1e293b', marginBottom: '1rem' }}>
        Welcome to Student Management System
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
        A modern, efficient MERN Stack web application designed to manage student records, registration, academic tracking, and administrative tasks easily.
      </p>
      
      <div>
        {token ? (
          <Link to="/dashboard" className="btn" style={{ display: 'inline-block', width: 'auto', padding: '0.8rem 2rem' }}>
            Go to Dashboard
          </Link>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/login" className="btn" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
              Login to Get Started
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
              Register Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
