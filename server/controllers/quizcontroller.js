const Quiz = require("../schema/quizschema.js");
const Teacher = require("../schema/teacherschema.js");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, category, difficulty, questions, teacherId } = req.body;

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create and save the quiz
    const newQuiz = new Quiz({
      title,
      category,
      difficulty,
      questions,
      createdBy: teacherId,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "name email");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get quizzes by a specific teacher
const getQuizzesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Verify teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const quizzes = await Quiz.find({ createdBy: teacherId });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single quiz by ID
const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("createdBy", "name email");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a quiz (Only the creator can delete it)
const deleteQuiz = async (req, res) => {
  try {
    const { quizId, teacherId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.createdBy.toString() !== teacherId) {
      return res.status(403).json({ message: "Unauthorized: Only the quiz creator can delete this" });
    }

    await quiz.deleteOne();
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a quiz (Only the creator can update it)
const updateQuiz = async (req, res) => {
  try {
    const { quizId, teacherId } = req.params;
    const { title, category, difficulty, questions } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.createdBy.toString() !== teacherId) {
      return res.status(403).json({ message: "Unauthorized: Only the quiz creator can update this" });
    }

    quiz.title = title || quiz.title;
    quiz.category = category || quiz.category;
    quiz.difficulty = difficulty || quiz.difficulty;
    quiz.questions = questions || quiz.questions;

    await quiz.save();
    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizzesByTeacher,
  getQuizById,
  deleteQuiz,
  updateQuiz,
};
