const mongoose=require("mongoose")
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Animals', 'Plants', 'Fish', 'Microorganisms', 'Others'], 
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], 
    default: 'Medium'
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, default: false }
        }
      ]
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports= mongoose.model('Quiz', QuizSchema);
