import { motion } from 'framer-motion';
import { RiMedalFill, RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';

function TeacherLeaderboard() {
  const students = [
    { name: "John Doe", score: 980, rank: 1, change: "up" },
    { name: "Jane Smith", score: 945, rank: 2, change: "down" },
    { name: "Mike Johnson", score: 920, rank: 3, change: "up" },
    { name: "Sarah Wilson", score: 890, rank: 4, change: "up" },
    { name: "Alex Brown", score: 850, rank: 5, change: "down" },
    { name: "Emily Davis", score: 820, rank: 6, change: "same" }
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

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1: return "bg-gradient-to-r from-yellow-300 to-yellow-500";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3: return "bg-gradient-to-r from-amber-600 to-amber-700";
      default: return "bg-gray-100";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Student Leaderboard</h1>
          <p className="text-gray-600">Top performers this semester</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {students.map((student, index) => (
            <motion.div
              key={student.name}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className={`${getMedalColor(student.rank)} p-1 rounded-xl`}
            >
              <div className="bg-white rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  {student.rank <= 3 ? (
                    <div className="relative">
                      <RiMedalFill 
                        className={`text-4xl ${
                          student.rank === 1 ? 'text-yellow-400' :
                          student.rank === 2 ? 'text-gray-400' :
                          'text-amber-600'
                        }`}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="absolute -top-1 -right-1 bg-white rounded-full p-1"
                      >
                        <span className="text-xs font-bold">{student.rank}</span>
                      </motion.div>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">#{student.rank}</span>
                  )}
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold">{student.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-600">{student.score} points</span>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="ml-3 flex items-center"
                    >
                      {student.change === "up" && (
                        <span className="text-green-500 flex items-center">
                          <RiArrowUpLine />
                          <span className="ml-1 text-sm">Trending up</span>
                        </span>
                      )}
                      {student.change === "down" && (
                        <span className="text-red-500 flex items-center">
                          <RiArrowDownLine />
                          <span className="ml-1 text-sm">Trending down</span>
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                  className="w-24 h-24 relative"
                >
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="#4F46E5"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(student.score / 1000) * 226} 226`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
                    {Math.round((student.score / 1000) * 100)}%
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TeacherLeaderboard;