import { motion } from 'framer-motion';
import { useState } from 'react';
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiBarChartBoxLine, RiUserLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const quizzes = [
    {
      id: 1,
      title: "Mathematics Mid-Term",
      subject: "Mathematics",
      totalStudents: 45,
      averageScore: 78,
      correctAnswers: 156,
      wrongAnswers: 84,
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      subject: "Physics",
      totalStudents: 38,
      averageScore: 82,
      correctAnswers: 142,
      wrongAnswers: 76,
      date: "2024-03-10"
    }
  ];

  const studentPerformance = [
    {
      id: 1,
      name: "John Doe",
      quizzesTaken: 5,
      averageScore: 85,
      rank: 1,
      recentScores: [90, 85, 88, 82, 80]
    },
    {
      id: 2,
      name: "Jane Smith",
      quizzesTaken: 5,
      averageScore: 82,
      rank: 2,
      recentScores: [85, 80, 88, 80, 77]
    },
    {
      id: 3,
      name: "Mike Johnson",
      quizzesTaken: 4,
      averageScore: 78,
      rank: 3,
      recentScores: [75, 80, 82, 75]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleCreateQuiz = () => {
    setShowQuizForm(true);
    setEditingQuiz(null);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setShowQuizForm(true);
  };

  const handleDeleteQuiz = (quizId) => {
    // Implement delete logic
    console.log('Deleting quiz:', quizId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage quizzes and monitor student performance</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { icon: RiBarChartBoxLine, label: "Total Quizzes", value: quizzes.length, color: "bg-blue-500" },
          { icon: RiUserLine, label: "Total Students", value: "45", color: "bg-green-500" },
          { icon: RiCheckLine, label: "Avg. Correct Answers", value: "78%", color: "bg-purple-500" },
          { icon: RiCloseLine, label: "Avg. Wrong Answers", value: "22%", color: "bg-orange-500" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center">
              <div className={`${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b">
          <nav className="flex space-x-8">
            {['overview', 'quizzes', 'students'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === 'quizzes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Quiz Management</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateQuiz}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg"
              >
                <RiAddLine className="mr-2" />
                Create Quiz
              </motion.button>
            </div>

            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
                      <p className="text-gray-600">{quiz.subject}</p>
                      <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                        <span>Students: {quiz.totalStudents}</span>
                        <span>Average: {quiz.averageScore}%</span>
                        <span>Date: {quiz.date}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditQuiz(quiz)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                      >
                        <RiEditLine size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <RiDeleteBinLine size={20} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-green-600 font-semibold">Correct Answers</div>
                      <div className="text-2xl font-bold text-green-700">{quiz.correctAnswers}</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-red-600 font-semibold">Wrong Answers</div>
                      <div className="text-2xl font-bold text-red-700">{quiz.wrongAnswers}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Student Performance</h2>
            <div className="space-y-4">
              {studentPerformance.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">#{student.rank}</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quizzes Taken: {student.quizzesTaken} | Average: {student.averageScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {student.recentScores.map((score, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            score >= 85 ? 'bg-green-100 text-green-700' :
                            score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {score}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              variants={item}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Recent Quiz Performance</h2>
              <div className="space-y-4">
                {quizzes.slice(0, 3).map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{quiz.title}</p>
                      <p className="text-sm text-gray-500">{quiz.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-green-500">
                        <span className="font-bold">{quiz.averageScore}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Top Performing Students</h2>
              <div className="space-y-4">
                {studentPerformance.slice(0, 3).map((student, index) => (
                  <div key={student.id} className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">Average: {student.averageScore}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Quiz Form Modal */}
      {showQuizForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full"
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            {/* Add form fields here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quiz Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingQuiz?.title}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingQuiz?.subject}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={editingQuiz?.date}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowQuizForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                {editingQuiz ? 'Save Changes' : 'Create Quiz'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default TeacherDashboard;