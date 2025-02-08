const express = require("express");

const { 
  createQuiz, 
  getAllQuizzes, 
  getQuizzesByTeacher, 
  getQuizById, 
  deleteQuiz, 
  updateQuiz 
} =require('../controllers/quizcontroller.js');

const router = express.Router();

router.post('/create', createQuiz); // Create a quiz
router.get('/', getAllQuizzes); // Get all quizzes
router.get('/:teacherId', getQuizzesByTeacher); // Get quizzes by teacher
router.get('/quiz/:quizId', getQuizById); // Get a single quiz by ID
router.delete('/:quizId/:teacherId', deleteQuiz); // Delete quiz (only creator)
router.put('/:quizId/:teacherId', updateQuiz); // Update quiz (only creator)

module.exports = router;
