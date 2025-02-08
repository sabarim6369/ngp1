import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard/studentdashboard';
import Studentquiz from './pages/quiz/studentquiz';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Login from './pages/login';
import TeacherDashboard from './pages/dashboard/teacherdashboard';
import TeacherLeaderboard from './pages/leaderboard/teacherleaderboard';
import SuperAdminDashboard from './pages/dashboard/superadmindashboard';
import Studentprofile from './pages/profile/student';
import Teacherprofile from './pages/profile/teacher';
import TeacherQuiz from './pages/quiz/teacherquiz';
import Admin from './pages/dashboard/admindashboard';
import AdminProfile from './pages/profile/adminprofile'
import Org from './components/organisms/mainorganism';
function getRoleFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ['/login'];
  const role = getRoleFromToken();
  const getDashboardComponent = () => {
    switch (role) {
      case 'superadmin':
        return <SuperAdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <Admin />; 
      case 'student':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <main className={`flex-1 ${hideSidebarRoutes.includes(location.pathname) ? '' : 'ml-64'} bg-gray-50 min-h-screen`}>
        <Routes>
          <Route path="/" element={getDashboardComponent()} />
          <Route path="/quiz" element={<Studentquiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Studentprofile />} />
          <Route path="/teacherprofile" element={<Teacherprofile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/teacherleaderboard" element={<TeacherLeaderboard />} />
          <Route path="/admindashboard" element={<Admin />}/>
          <Route path="/teacherquiz" element={<TeacherQuiz />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/organisms" element={<Org />} />
          
        
         
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
