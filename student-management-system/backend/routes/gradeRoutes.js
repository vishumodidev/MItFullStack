import express from 'express';
import {
  upsertStudentGrade,
  getStudentGrade,
  getAllGrades
} from '../controllers/gradeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware
router.use(protect);

/**
 * @route   GET /api/grades
 * @desc    Get all student grades summary
 */
router.get('/', getAllGrades);

/**
 * @route   GET /api/grades/student/:studentId
 * @desc    Get grade details and report card for a specific student
 * @route   POST /api/grades/student/:studentId
 * @desc    Add or update marks/grades for a specific student
 */
router.route('/student/:studentId')
  .get(getStudentGrade)
  .post(upsertStudentGrade);

export default router;
