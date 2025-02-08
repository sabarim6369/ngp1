const Admin = require('../schema/adminschema'); // Import Admin model
const Teacher=require("../schema/teacherschema")
const bcrypt = require('bcryptjs'); // For password encryption
const jwt = require('jsonwebtoken'); 
exports.addStudentToTeacher = async (req, res) => {
  try {
    const { adminId, teacherEmail, student } = req.body;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Find the teacher by email within the admin
    const teacher = admin.teachers.find(t => t.email === teacherEmail);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Add the student to the teacher's students array
    if (!teacher.students) {
      teacher.students = []; // Ensure the students array exists
    }
    teacher.students.push(student);

    // Save the changes
    await admin.save();

    res.status(201).json({ message: 'Student added to teacher successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Add Quiz Controller (Teacher)
exports.addQuiz = async (req, res) => {
    try {
      const { teacherId, title, description, questions } = req.body;
  
      // Find the teacher by ID
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Create a new quiz
      const newQuiz = {
        title,
        description,
        questions, // Array of questions with options and correct option
      };
  
      // Add the quiz to the teacher's quizzes array
      teacher.quizzes.push(newQuiz);
      await teacher.save();
  
      res.status(201).json({ message: 'Quiz added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  console.log(req.body)
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const existingTeacher = await Teacher.findOne({ email });
  
      if (existingTeacher) {
        const isPasswordValid = await bcrypt.compare(password, existingTeacher.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
  
        const token = jwt.sign(
          { teacherId: existingTeacher._id, role: "teacher" }, // Role set to 'teacher'
          process.env.JWT_SECRET || "your_jwt_secret",
          { expiresIn: "1h" }
        );
  
        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            name: existingTeacher.name,
            email: existingTeacher.email,
            subject: existingTeacher.subject,
            phone: existingTeacher.phone,
            role: "teacher",
          },
        });
      }
  
      // If no Teacher is found, return error message
      return res.status(400).json({ message: "Invalid credentials" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  