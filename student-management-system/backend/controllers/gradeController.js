import Grade from '../models/gradeModel.js';
import Student from '../models/studentModel.js';

/**
 * Helper function to calculate Grade and GPA based on percentage
 */
const calculateGradeAndGPA = (percentage) => {
  if (percentage >= 90) return { grade: 'A+', gpa: 4.0 };
  if (percentage >= 80) return { grade: 'A', gpa: 3.7 };
  if (percentage >= 70) return { grade: 'B', gpa: 3.0 };
  if (percentage >= 60) return { grade: 'C', gpa: 2.0 };
  if (percentage >= 50) return { grade: 'D', gpa: 1.0 };
  return { grade: 'F', gpa: 0.0 };
};

/**
 * @desc    Add or Update Student Grade Record
 * @route   POST /api/grades/student/:studentId
 * @access  Private
 */
export const upsertStudentGrade = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { semester, subjects } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student record not found' });
    }

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one subject with marks' });
    }

    // Calculate total, obtained marks, percentage, and GPA
    let totalMax = 0;
    let totalObtained = 0;

    const formattedSubjects = subjects.map((sub) => {
      const marks = Number(sub.marksObtained) || 0;
      const max = Number(sub.maxMarks) || 100;
      totalObtained += marks;
      totalMax += max;
      return {
        subjectName: sub.subjectName,
        marksObtained: marks,
        maxMarks: max
      };
    });

    const percentage = totalMax > 0 ? Number(((totalObtained / totalMax) * 100).toFixed(2)) : 0;
    const { grade, gpa } = calculateGradeAndGPA(percentage);

    // Upsert (Find existing or create new grade document)
    let gradeRecord = await Grade.findOne({ student: studentId });

    if (gradeRecord) {
      gradeRecord.semester = semester || gradeRecord.semester;
      gradeRecord.subjects = formattedSubjects;
      gradeRecord.totalMarks = totalMax;
      gradeRecord.obtainedMarks = totalObtained;
      gradeRecord.percentage = percentage;
      gradeRecord.gpa = gpa;
      gradeRecord.grade = grade;
      await gradeRecord.save();
    } else {
      gradeRecord = await Grade.create({
        student: studentId,
        semester: semester || 'Semester 1',
        subjects: formattedSubjects,
        totalMarks: totalMax,
        obtainedMarks: totalObtained,
        percentage,
        gpa,
        grade
      });
    }

    res.status(200).json(gradeRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get Grade & Report Card for specific Student
 * @route   GET /api/grades/student/:studentId
 * @access  Private
 */
export const getStudentGrade = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const gradeRecord = await Grade.findOne({ student: studentId }).populate('student', 'name email course department mobile');

    if (!gradeRecord) {
      return res.status(404).json({ message: 'No grade record found for this student', student });
    }

    res.json(gradeRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get All Grades Summary
 * @route   GET /api/grades
 * @access  Private
 */
export const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('student', 'name email course department');
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
