import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../services/api';

/**
 * EditStudent Component
 * Fetches existing student details by ID and handles update form submission.
 */
const EditStudent = () => {
  const { id } = useParams(); // Extracts student ID parameter from current URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const { name, email, mobile, course, department } = formData;

  // Load target student record details when component mounts or ID changes
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/students/${id}`);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          mobile: response.data.mobile,
          course: response.data.course,
          department: response.data.department
        });
      } catch (err) {
        setError('Failed to fetch student record details');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle form field input updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle student update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setUpdating(true);
      await API.put(`/students/${id}`, formData);
      // Redirect back to students directory on success
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Student Details...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Student Details</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="form-control"
            value={mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            className="form-control"
            value={course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            value={department}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn" disabled={updating}>
            {updating ? 'Updating...' : 'Update Student'}
          </button>
          <Link to="/students" className="btn btn-secondary" style={{ textAlign: 'center' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
