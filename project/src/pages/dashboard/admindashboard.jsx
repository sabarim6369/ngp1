import { motion } from 'framer-motion';
import { useState } from 'react';
import { RiAddLine, RiUserLine, RiTeamLine, RiFileList2Line, RiBarChartLine } from 'react-icons/ri';

function Admin() {
  const [activeTab, setActiveTab] = useState('students');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Sample data - In a real app, this would come from your backend
  const students = [
    { id: 1, name: "John Doe", email: "john@example.com", rank: 1, score: 980 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", rank: 2, score: 945 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", rank: 3, score: 920 },
  ];

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      subject: "Mathematics",
      quizzes: [
        { id: 1, title: "Calculus Basics", participants: 45, avgScore: 78 },
        { id: 2, title: "Linear Algebra", participants: 38, avgScore: 82 },
      ],
    },
    {
      id: 2,
      name: "Prof. Robert Brown",
      subject: "Physics",
      quizzes: [
        { id: 1, title: "Mechanics", participants: 42, avgScore: 75 },
        { id: 2, title: "Thermodynamics", participants: 40, avgScore: 80 },
      ],
    },
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

  const AddModal = ({ type, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      rollNumber: '',
      phone: '',
      teacherEmail: 'john.ddoe@example.com'
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (type === 'Student') {
        try {
          const response = await fetch('http://localhost:2000/api/teacher/addstudent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              adminId: '67a760b79fe32ec3c0d28c39',
              teacherEmail: formData.teacherEmail,
              student: {
                name: formData.name,
                email: formData.email,
                rollNumber: formData.rollNumber,
                phone: formData.phone
              }
            })
          });

          if (response.ok) {
            alert('Student added successfully!');
            onClose();
          } else {
            throw new Error('Failed to add student');
          }
        } catch (error) {
          console.error('Error adding student:', error);
          alert('Failed to add student. Please try again.');
        }
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Add New {type}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter email"
                required
              />
            </div>
            {type === 'Student' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Enter roll number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </>
            )}
            {type === 'Teacher' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter subject"
                />
              </div>
            )}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Add {type}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setModalType(activeTab === 'students' ? 'Student' : 'Teacher');
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg"
        >
          <RiAddLine className="mr-2" />
          Add {activeTab === 'students' ? 'Student' : 'Teacher'}
        </motion.button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'students'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <RiUserLine className="mr-2" />
            Students
          </button>
          <button
            onClick={() => {
              setActiveTab('teachers');
              setSelectedTeacher(null);
            }}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'teachers'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <RiTeamLine className="mr-2" />
            Teachers
          </button>
        </div>
      </div>

      {activeTab === 'students' && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <motion.tr
                  key={student.id}
                  variants={item}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      #{student.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {student.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{student.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-primary">
                      {student.score}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === 'teachers' && !selectedTeacher && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {teachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              variants={item}
              onClick={() => setSelectedTeacher(teacher)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <RiTeamLine className="text-xl text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.subject}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Quizzes: {teacher.quizzes.length}</span>
                <span>Click to view details</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'teachers' && selectedTeacher && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            onClick={() => setSelectedTeacher(null)}
            className="text-primary hover:text-primary/80"
          >
            ← Back to Teachers
          </button>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <RiTeamLine className="text-2xl text-primary" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                <p className="text-gray-500">{selectedTeacher.subject}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Posted Quizzes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {selectedTeacher.quizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{quiz.title}</h4>
                      <span className="text-sm text-gray-500">
                        {quiz.participants} participants
                      </span>
                    </div>
                    <div className="flex items-center">
                      <RiBarChartLine className="text-primary mr-2" />
                      <span className="text-sm">
                        Average Score: {quiz.avgScore}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showAddModal && (
        <AddModal type={modalType} onClose={() => setShowAddModal(false)} />
      )}
    </motion.div>
  );
}

export default Admin;