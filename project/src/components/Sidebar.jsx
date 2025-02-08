import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboardLine, RiQuestionLine, RiTrophyLine, RiUserLine, RiTeamLine } from 'react-icons/ri';
import { jwtDecode } from 'jwt-decode';

const getMenuItems = (role) => {
  switch (role) {
    case 'superadmin':
      return [
        { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
        { path: '/profile', icon: RiUserLine, label: 'Profile' },
      ];
    case 'admin':
      return [
        { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
      
        { path: '/adminprofile', icon: RiUserLine, label: 'Profile' },
      ];
    case 'teacher':
      return [
        { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
        { path: '/leaderboard', icon: RiUserLine, label: 'Leaderboard' },
        { path: '/teacherquiz', icon: RiQuestionLine, label: 'Quiz' },
        { path: '/teacherprofile', icon: RiUserLine, label: 'Profile' },
      ];
    case 'student':
      return [
        { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
        { path: '/quiz', icon: RiQuestionLine, label: 'Quiz' },
        { path: '/leaderboard', icon: RiTrophyLine, label: 'Leaderboard' },
        { path: '/profile', icon: RiUserLine, label: 'Profile' },
        { path: '/Organisms', icon: RiUserLine, label: 'Organisms' },
      ];
    default:
      return [];
  }
};

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let role = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  const menuItems = getMenuItems(role);

  // Set dynamic title based on role
  let portalTitle = 'Portal';
  if (role === 'teacher') {
    portalTitle = 'Teacher Portal';
  } else if (role === 'student') {
    portalTitle = 'Student Portal';
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to the login page after signing out
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">{portalTitle}</h1>
      </div>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-xl mr-3" />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="flex items-center p-3 mt-4 rounded-lg w-full text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <RiUserLine className="text-xl mr-3" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Sidebar;
