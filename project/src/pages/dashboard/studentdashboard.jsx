import { motion } from 'framer-motion';
import { RiDownloadLine, RiBarChartBoxLine, RiBookOpenLine, RiTimeLine, RiUserLine, RiCalendarLine } from 'react-icons/ri';

function Dashboard() {
  const resources = [
    { name: "Study Guide 2024", size: "2.3 MB", type: "PDF", downloads: 128 },
    { name: "Practice Questions", size: "1.1 MB", type: "DOC", downloads: 85 },
    { name: "Course Materials", size: "5.6 MB", type: "ZIP", downloads: 234 }
  ];

  const upcomingQuizzes = [
    { subject: "Mathematics", date: "Tomorrow", time: "10:00 AM", difficulty: "Medium" },
    { subject: "Science", date: "Friday", time: "2:00 PM", difficulty: "Hard" }
  ];

  const recentActivities = [
    { action: "Completed Quiz", subject: "History", score: "85%", time: "2 hours ago" },
    { action: "Submitted Assignment", subject: "English", status: "Pending", time: "5 hours ago" },
    { action: "Started Course", subject: "Physics", progress: "15%", time: "1 day ago" }
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your studies today.</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          { icon: RiBarChartBoxLine, label: "Overall Progress", value: "78%", color: "bg-blue-500" },
          { icon: RiBookOpenLine, label: "Courses Completed", value: "12/15", color: "bg-green-500" },
          { icon: RiTimeLine, label: "Study Hours", value: "128h", color: "bg-purple-500" },
          { icon: RiUserLine, label: "Class Rank", value: "#12", color: "bg-orange-500" }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resources Section */}
        <motion.div
          variants={item}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Latest Resources</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-600' :
                      resource.type === 'DOC' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <RiBookOpenLine className="text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{resource.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{resource.type}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.size}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-full"
                  >
                    <RiDownloadLine size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upcoming Quizzes */}
        <motion.div
          variants={item}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Upcoming Quizzes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{quiz.subject}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      quiz.difficulty === 'Hard' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <RiCalendarLine className="mr-2" />
                    <span>{quiz.date} at {quiz.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={item}
          className="lg:col-span-3 bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                    <RiBookOpenLine className="text-primary text-xl" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{activity.action} - {activity.subject}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      {activity.score && <span className="text-green-500">{activity.score}</span>}
                      {activity.status && (
                        <span className="text-yellow-500">Status: {activity.status}</span>
                      )}
                      {activity.progress && (
                        <div className="w-24 h-2 bg-gray-200 rounded-full ml-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activity.progress }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      )}
                      <span className="ml-auto">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Dashboard;