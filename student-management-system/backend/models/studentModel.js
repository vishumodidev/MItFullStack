import mongoose from 'mongoose';

/**
 * Student Schema defines the structure and validation rules for Student documents in MongoDB.
 * Fields: name, email, mobile, course, department.
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add student name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add student email'],
      trim: true,
      lowercase: true
    },
    mobile: {
      type: String,
      required: [true, 'Please add mobile number'],
      trim: true
    },
    course: {
      type: String,
      required: [true, 'Please add course'],
      trim: true
    },
    department: {
      type: String,
      required: [true, 'Please add department'],
      trim: true
    }
  },
  {
    timestamps: true // Tracks when student record was created or modified
  }
);

// Create and export the Student model based on studentSchema
const Student = mongoose.model('Student', studentSchema);
export default Student;
