import Student from '../models/studentModel.js';

/**
 * @desc    Fetch all students (Supports search by name query param: ?search=john)
 * @route   GET /api/students
 * @access  Private
 */
export const getStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search term is provided in URL query params, perform case-insensitive regex matching on name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Retrieve students matching query and sort by newest first
    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Fetch single student by MongoDB ID
 * @route   GET /api/students/:id
 * @access  Private
 */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Add a new student
 * @route   POST /api/students
 * @access  Private
 */
export const addStudent = async (req, res) => {
  try {
    const { name, email, mobile, course, department } = req.body;

    // Validate mandatory input fields
    if (!name || !email || !mobile || !course || !department) {
      return res.status(400).json({ message: 'Please fill in all student details' });
    }

    // Create new student document in database
    const student = await Student.create({
      name,
      email,
      mobile,
      course,
      department
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update existing student record by ID
 * @route   PUT /api/students/:id
 * @access  Private
 */
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update fields or keep existing values if not provided
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.mobile = req.body.mobile || student.mobile;
    student.course = req.body.course || student.course;
    student.department = req.body.department || student.department;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete student record by ID
 * @route   DELETE /api/students/:id
 * @access  Private
 */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
