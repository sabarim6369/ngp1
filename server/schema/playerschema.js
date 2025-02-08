const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,  
    default: 'default-avatar.png'
  },
  level: {
    type: Number, // Represents player level (if applicable)
    default: 1
  },
  experience: {
    type: Number, // XP gained by playing the game or taking quizzes
    default: 0
  },
  highScore: {
    type: Number, // Highest quiz score
    default: 0
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Reference to the Admin model
    required: true
  },
  quizzesTaken: {
    type: Number, // Number of quizzes completed
    default: 0
  },
  attendedQuizzes: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz' // Reference to the Quiz schema
      },
      score: {
        type: Number, // Score achieved in the quiz
        default: 0
      },
      attemptedAt: {
        type: Date, // Timestamp when the quiz was taken
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
