import mongoose from 'mongoose';

/**
 * Subject Schema for individual subject performance
 */
const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  marksObtained: {
    type: Number,
    required: [true, 'Marks obtained is required'],
    min: 0
  },
  maxMarks: {
    type: Number,
    default: 100,
    min: 1
  }
});

/**
 * Grade Schema for overall student academic report
 */
const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      unique: true // One grade report card per student
    },
    semester: {
      type: String,
      default: 'Semester 1',
      trim: true
    },
    subjects: [subjectSchema],
    totalMarks: {
      type: Number,
      default: 0
    },
    obtainedMarks: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    gpa: {
      type: Number,
      default: 0
    },
    grade: {
      type: String,
      default: 'N/A'
    }
  },
  {
    timestamps: true
  }
);

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;
