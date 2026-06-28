import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

/**
 * Grades Component
 * Lists all students alongside their academic standing, GPA, and report actions.
 */
const Grades = () => {
  const [students, setStudents] = useState([]);
  const [gradesMap, setGradesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        setLoading(true);
        const [studentsRes, gradesRes] = await Promise.all([
          API.get('/students'),
          API.get('/grades')
        ]);

        setStudents(studentsRes.data);

        // Map grade by student ID for fast lookup
        const map = {};
        gradesRes.data.forEach((g) => {
          if (g.student && g.student._id) {
            map[g.student._id] = g;
          }
        });
        setGradesMap(map);
      } catch (err) {
        setError('Failed to load grade records');
      } finally {
        setLoading(false);
      }
    };

    fetchGradesData();
  }, []);

  const getGradeBadgeClass = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'badge badge-success';
      case 'B':
      case 'C':
        return 'badge badge-info';
      case 'D':
        return 'badge badge-warning';
      case 'F':
        return 'badge badge-danger';
      default:
        return 'badge badge-secondary';
    }
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Grades & Report Directory...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>📊 Academic Grades & Report Cards</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {students.length === 0 ? (
        <p style={{ color: '#64748b' }}>No students registered in system.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Percentage</th>
                <th>GPA</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const gradeInfo = gradesMap[student._id];
                return (
                  <tr key={student._id}>
                    <td><strong>{student.name}</strong></td>
                    <td>{student.course}</td>
                    <td>{gradeInfo ? gradeInfo.semester : 'Not Assigned'}</td>
                    <td>{gradeInfo ? `${gradeInfo.percentage}%` : 'N/A'}</td>
                    <td><strong>{gradeInfo ? gradeInfo.gpa.toFixed(1) : 'N/A'}</strong></td>
                    <td>
                      <span className={getGradeBadgeClass(gradeInfo ? gradeInfo.grade : 'N/A')}>
                        {gradeInfo ? gradeInfo.grade : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link to={`/grades/manage/${student._id}`} className="btn btn-secondary btn-sm">
                          ✏️ Enter Marks
                        </Link>
                        {gradeInfo && (
                          <Link to={`/grades/report/${student._id}`} className="btn btn-sm" style={{ backgroundColor: '#10b981' }}>
                            📜 Report Card
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Grades;
