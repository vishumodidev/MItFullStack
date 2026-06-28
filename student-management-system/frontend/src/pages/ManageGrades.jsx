import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

/**
 * ManageGrades Component
 * Dynamic form for entering subject marks for a specific student.
 */
const ManageGrades = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [semester, setSemester] = useState('Semester 1');
  const [subjects, setSubjects] = useState([
    { subjectName: 'Mathematics', marksObtained: 85, maxMarks: 100 },
    { subjectName: 'Science', marksObtained: 90, maxMarks: 100 },
    { subjectName: 'Computer Science', marksObtained: 95, maxMarks: 100 },
    { subjectName: 'English', marksObtained: 80, maxMarks: 100 }
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchStudentAndGrades = async () => {
      try {
        setLoading(true);
        const studentRes = await API.get(`/students/${studentId}`);
        setStudent(studentRes.data);

        // Fetch existing grades if any
        try {
          const gradeRes = await API.get(`/grades/student/${studentId}`);
          if (gradeRes.data && gradeRes.data.subjects && gradeRes.data.subjects.length > 0) {
            setSemester(gradeRes.data.semester || 'Semester 1');
            setSubjects(gradeRes.data.subjects);
          }
        } catch (e) {
          // No existing grades yet
        }
      } catch (err) {
        setMessage({ type: 'danger', text: 'Failed to load student information' });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAndGrades();
  }, [studentId]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubjectRow = () => {
    setSubjects([...subjects, { subjectName: '', marksObtained: 0, maxMarks: 100 }]);
  };

  const removeSubjectRow = (index) => {
    if (subjects.length === 1) {
      alert('At least one subject is required.');
      return;
    }
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    for (let sub of subjects) {
      if (!sub.subjectName.trim()) {
        setMessage({ type: 'danger', text: 'Please enter all subject names' });
        return;
      }
    }

    try {
      setSaving(true);
      await API.post(`/grades/student/${studentId}`, {
        semester,
        subjects
      });
      setMessage({ type: 'success', text: 'Grades saved successfully! Redirecting...' });
      setTimeout(() => {
        navigate('/grades');
      }, 1200);
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to save marks' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Student Grade Manager...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="page-header">
        <h2>✏️ Assign Marks - {student?.name}</h2>
        <Link to="/grades" className="btn btn-secondary btn-sm">⬅️ Back to Grades</Link>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
        <p><strong>Course:</strong> {student?.course} | <strong>Department:</strong> {student?.department}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div className="form-group">
          <label htmlFor="semester">Select Academic Term / Semester</label>
          <select
            id="semester"
            className="form-control"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Final Term">Final Term</option>
          </select>
        </div>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>Subject Marks Breakdown</h3>

        {subjects.map((sub, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              {idx === 0 && <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Subject Name</label>}
              <input
                type="text"
                className="form-control"
                placeholder="Subject Name"
                value={sub.subjectName}
                onChange={(e) => handleSubjectChange(idx, 'subjectName', e.target.value)}
                required
              />
            </div>
            <div>
              {idx === 0 && <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Marks</label>}
              <input
                type="number"
                className="form-control"
                placeholder="Marks"
                min="0"
                max={sub.maxMarks}
                value={sub.marksObtained}
                onChange={(e) => handleSubjectChange(idx, 'marksObtained', e.target.value)}
                required
              />
            </div>
            <div>
              {idx === 0 && <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Max Marks</label>}
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                min="1"
                value={sub.maxMarks}
                onChange={(e) => handleSubjectChange(idx, 'maxMarks', e.target.value)}
                required
              />
            </div>
            <div style={{ alignSelf: idx === 0 ? 'flex-end' : 'center' }}>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSubjectRow(idx)}
                style={{ padding: '0.75rem' }}
                title="Remove Subject"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary"
          onClick={addSubjectRow}
          style={{ marginTop: '0.5rem', marginBottom: '1.5rem', width: 'auto', padding: '0.5rem 1rem' }}
        >
          ➕ Add Another Subject
        </button>

        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Calculating & Saving...' : '💾 Save & Calculate GPA'}
        </button>
      </form>
    </div>
  );
};

export default ManageGrades;
