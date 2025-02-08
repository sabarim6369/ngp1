const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
  createdAt: { type: Date, default: Date.now },
  quizzes: [
    {
      title: { type: String, required: true },
      description: { type: String },
      questions: [
        {
          questionText: { type: String, required: true },
          options: [
            { type: String, required: true }
          ],
          correctOption: { type: Number, required: true } // Index of the correct option
        }
      ],
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Teacher', TeacherSchema);
