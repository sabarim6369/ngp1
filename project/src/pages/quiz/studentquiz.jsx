import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RiTimeLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

function Studentquiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2,
      explanation: "Paris is the capital and largest city of France."
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
      explanation: "Mars is called the Red Planet because of its reddish appearance."
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1,
      explanation: "The Blue Whale is the largest animal known to have ever existed."
    }
  ];

  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

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
          <h1 className="text-3xl font-bold mb-4">Quiz Challenge</h1>
          <div className="bg-white rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-full bg-primary"
            />
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </motion.div>

        <motion.div
          key={currentQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 flex items-center">
                <RiTimeLine className="mr-2" /> Time remaining: 30s
              </span>
            </div>
            <h2 className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-colors ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-primary hover:bg-primary/5'
                      : selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : index === questions[currentQuestion].correct && showResult
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-500"
                      >
                        <RiCheckLine size={24} />
                      </motion.span>
                    )}
                    {showResult && selectedAnswer === index && index !== questions[currentQuestion].correct && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-red-500"
                      >
                        <RiCloseLine size={24} />
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 p-4 rounded-lg bg-gray-50"
                >
                  <p className="text-gray-700">
                    {questions[currentQuestion].explanation}
                  </p>
                  {currentQuestion < questions.length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
                    >
                      Next Question
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-gray-600"
        >
          Current Score: {score} / {questions.length}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Studentquiz;