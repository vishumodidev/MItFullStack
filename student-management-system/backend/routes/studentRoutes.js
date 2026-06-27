import express from 'express';
import {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect middleware to all routes in this router so only authenticated users can manage students
router.use(protect);

/**
 * @route   GET /api/students
 * @desc    Get all students (or filter by search query)
 * @route   POST /api/students
 * @desc    Add a new student
 */
router.route('/')
  .get(getStudents)
  .post(addStudent);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 * @route   PUT /api/students/:id
 * @desc    Update student details
 * @route   DELETE /api/students/:id
 * @desc    Delete student record
 */
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export default router;
