import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RiAddLine, RiDeleteBinLine, RiCheckLine } from 'react-icons/ri';

function TeacherQuiz() {
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correct: null,
      explanation: ''
    }
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].correct = answerIndex;
    setQuestions(newQuestions);
  };

  const handleExplanationChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].explanation = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correct: null, explanation: '' }
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = () => {
    // Logic to save the quiz to the database or store
    console.log("Quiz saved:", questions);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
          <button
            onClick={handleAddQuestion}
            className="px-6 py-2 bg-primary text-white rounded-lg mb-4 flex items-center"
          >
            <RiAddLine className="mr-2" /> Add Question
          </button>
        </motion.div>

        {questions.map((question, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 flex items-center">
                  Question {index + 1}
                </span>
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="text-red-500"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Enter question"
                className="w-full p-4 text-lg border-2 rounded-xl"
              />
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="w-full p-4 text-left rounded-xl border-2 mb-2"
                    />
                    <button
                      onClick={() => handleCorrectAnswerChange(index, optionIndex)}
                      className={`ml-2 ${
                        question.correct === optionIndex ? 'text-green-500' : 'text-gray-500'
                      }`}
                    >
                      <RiCheckLine />
                    </button>
                  </div>
                ))}
              </div>

              <textarea
                value={question.explanation}
                onChange={(e) => handleExplanationChange(index, e)}
                placeholder="Explanation for the correct answer"
                className="w-full p-4 mt-4 text-left rounded-xl border-2"
              />
            </div>
          </motion.div>
        ))}

        <motion.button
          onClick={handleSaveQuiz}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-primary text-white rounded-lg mt-6"
        >
          Save Quiz
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TeacherQuiz;
