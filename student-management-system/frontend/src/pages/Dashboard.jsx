import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

/**
 * Dashboard Component
 * Protected landing overview showing user profile data and student management metrics.
 */
const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch logged-in user profile and student list metrics concurrently on component mount
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, studentsRes] = await Promise.all([
          API.get('/auth/profile'),
          API.get('/students')
        ]);

        setUserProfile(profileRes.data);
        setStudentCount(studentsRes.data.length);
      } catch (err) {
        setError('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Dashboard...</div>;
  }

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
          Welcome back, {userProfile?.name}! 👋
        </h1>
        <p style={{ color: '#64748b' }}>Logged in as: <strong>{userProfile?.email}</strong></p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Registered Students</h3>
          <p>{studentCount}</p>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#10b981' }}>
          <h3>System Status</h3>
          <p style={{ fontSize: '1.25rem', color: '#10b981', marginTop: '1rem' }}>Online & Connected</p>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
        <Link to="/students" className="btn" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          📋 View All Students
        </Link>
        <Link to="/students/add" className="btn btn-secondary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }}>
          ➕ Add New Student
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
