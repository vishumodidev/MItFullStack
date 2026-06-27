import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

/**
 * Students Component
 * Renders all student records in a table format with real-time search filtering and delete capability.
 */
const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch student records from backend API
  const fetchStudents = async (query = '') => {
    try {
      setLoading(true);
      const response = await API.get(`/students${query ? `?search=${query}` : ''}`);
      setStudents(response.data);
    } catch (err) {
      setMessage({ type: 'danger', text: 'Failed to load student records' });
    } finally {
      setLoading(false);
    }
  };

  // Trigger API call on initial mount and when search state updates
  useEffect(() => {
    fetchStudents(search);
  }, [search]);

  // Handle student record deletion
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      try {
        await API.delete(`/students/${id}`);
        setMessage({ type: 'success', text: 'Student record deleted successfully' });
        // Refresh student list after successful deletion
        fetchStudents(search);
      } catch (err) {
        setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to delete student' });
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Student Directory</h2>
        <Link to="/students/add" className="btn btn-sm" style={{ padding: '0.6rem 1.2rem' }}>
          ➕ Add New Student
        </Link>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Search Input Box */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student List Table */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p style={{ color: '#64748b', marginTop: '1rem' }}>No student records found.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Course</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td><strong>{student.name}</strong></td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td>{student.course}</td>
                  <td>{student.department}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        to={`/students/edit/${student._id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(student._id, student.name)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
