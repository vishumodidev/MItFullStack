import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

/**
 * ReportCard Component
 * Generates an official, printable academic transcript / report card for a student.
 */
const ReportCard = () => {
  const { studentId } = useParams();
  const [gradeData, setGradeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReportCard = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/grades/student/${studentId}`);
        setGradeData(response.data);
      } catch (err) {
        setError('Failed to generate report card or no marks assigned yet.');
      } finally {
        setLoading(false);
      }
    };

    fetchReportCard();
  }, [studentId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', marginTop: '3rem' }}>Generating Student Report Card...</div>;
  }

  if (error || !gradeData) {
    return (
      <div className="container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
        <div className="alert alert-danger">{error || 'No report card available.'}</div>
        <Link to="/grades" className="btn btn-secondary btn-sm">⬅️ Back to Grades</Link>
      </div>
    );
  }

  const student = gradeData.student;

  return (
    <div className="container" style={{ maxWidth: '850px' }}>
      {/* Hide controls during printing */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link to="/grades" className="btn btn-secondary btn-sm">⬅️ Back to Directory</Link>
        <button onClick={handlePrint} className="btn btn-sm" style={{ width: 'auto', padding: '0.6rem 1.2rem', backgroundColor: '#10b981' }}>
          🖨️ Print / Save PDF Report Card
        </button>
      </div>

      {/* Printable Report Card Document */}
      <div className="report-card" style={{ background: '#ffffff', padding: '3rem', borderRadius: '12px', border: '2px solid #cbd5e1', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        {/* Institution Header */}
        <div style={{ textAlign: 'center', borderBottom: '3px double #4f46e5', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <h1 style={{ color: '#4f46e5', fontSize: '2.2rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            🎓 ACADEMIC REPORT CARD
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.25rem' }}>Student Management System & Performance Evaluation</p>
        </div>

        {/* Student Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          <div><span style={{ color: '#64748b', fontWeight: 500 }}>Student Name:</span> <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{student?.name}</strong></div>
          <div><span style={{ color: '#64748b', fontWeight: 500 }}>Semester / Term:</span> <strong style={{ color: '#0f172a' }}>{gradeData.semester}</strong></div>
          <div><span style={{ color: '#64748b', fontWeight: 500 }}>Course & Dept:</span> <strong style={{ color: '#0f172a' }}>{student?.course} ({student?.department})</strong></div>
          <div><span style={{ color: '#64748b', fontWeight: 500 }}>Email Contact:</span> <strong style={{ color: '#0f172a' }}>{student?.email}</strong></div>
        </div>

        {/* Subject Marks Table */}
        <table className="table" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ background: '#4f46e5', color: '#ffffff' }}>
              <th style={{ color: '#fff', padding: '0.875rem' }}>#</th>
              <th style={{ color: '#fff', padding: '0.875rem' }}>Subject Name</th>
              <th style={{ color: '#fff', padding: '0.875rem', textAlign: 'center' }}>Max Marks</th>
              <th style={{ color: '#fff', padding: '0.875rem', textAlign: 'center' }}>Marks Obtained</th>
              <th style={{ color: '#fff', padding: '0.875rem', textAlign: 'center' }}>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {gradeData.subjects.map((sub, idx) => {
              const subPct = ((sub.marksObtained / sub.maxMarks) * 100).toFixed(1);
              return (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td><strong>{sub.subjectName}</strong></td>
                  <td style={{ textAlign: 'center' }}>{sub.maxMarks}</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{sub.marksObtained}</td>
                  <td style={{ textAlign: 'center' }}>{subPct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Academic Performance Summary Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', background: '#e0e7ff', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #c7d2fe' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 600, textTransform: 'uppercase' }}>Total Score</span>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>{gradeData.obtainedMarks} / {gradeData.totalMarks}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 600, textTransform: 'uppercase' }}>Percentage</span>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>{gradeData.percentage}%</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 600, textTransform: 'uppercase' }}>Calculated GPA</span>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>{gradeData.gpa.toFixed(1)} / 4.0</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#3730a3', fontWeight: 600, textTransform: 'uppercase' }}>Final Grade</span>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4f46e5', margin: 0 }}>{gradeData.grade}</p>
          </div>
        </div>

        {/* Footer Signature Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', paddingTop: '1rem', borderTop: '1px solid #cbd5e1' }}>
          <div>
            <p style={{ fontWeight: 600, color: '#475569' }}>Date of Issue: {new Date(gradeData.updatedAt).toLocaleDateString()}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ borderBottom: '1px solid #0f172a', width: '180px', marginBottom: '0.25rem' }}></div>
            <p style={{ fontWeight: 600, color: '#0f172a' }}>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
