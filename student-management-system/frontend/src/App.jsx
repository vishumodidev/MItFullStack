import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import Grades from './pages/Grades';
import ManageGrades from './pages/ManageGrades';
import ReportCard from './pages/ReportCard';

/**
 * Main App Component
 * Configures application routing structure using React Router v6.
 */
function App() {
  return (
    <Router>
      {/* Global Navigation Bar rendered across all pages */}
      <Navbar />

      <Routes>
        {/* Public Routes accessible to all users */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes restricted to authenticated users with valid JWT */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/grades/manage/:studentId" element={<ManageGrades />} />
          <Route path="/grades/report/:studentId" element={<ReportCard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
