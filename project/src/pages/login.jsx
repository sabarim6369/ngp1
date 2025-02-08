import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!role) {
      toast.error("Please select a role");
      return;
    }
  
    try {
      console.log(`Logging in with email: ${email} and role: ${role}`);
  
      if (role === "student") {
        const response = await axios.post("https://ngp1-2.onrender.com/api/player/login", {
          email,
          password,
          role,
        });
  
        console.log("API Response for Student:", response);
  
        if (response.status === 200) {
          toast.success("Login successful!");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
              navigate("/");
            }, 2000); // Delay navigation by 2 seconds
          } else {
            toast.error("No token received from server.");
          }
        } else {
          toast.error("Login failed: Invalid response status");
        }
      } else if (role === "admin") {
        const response = await axios.post("https://ngp1-2.onrender.com/api/admin/login", {
          email,
          password,
          role,
        });
  
        console.log("API Response for Admin:", response);
  
        if (response.status === 200) {
          toast.success("Login successful!");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
              navigate("/");
            }, 2000); // Delay navigation by 2 seconds
          } else {
            toast.error("No token received from server.");
          }
        } else {
          toast.error("Login failed: Invalid response status");
        }
      } else if (role === "superadmin") {
        const response = await axios.post("https://ngp1-2.onrender.com/api/superadmin/login", {
          email,
          password,
          role,
        });
  
        console.log("API Response for Superadmin:", response);
  
        if (response.status === 200) {
          console.log(response.data);
          toast.success("Login successful!");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
              navigate("/superadmin");
            }, 2000); // Delay navigation by 2 seconds
          } else {
            toast.error("No token received from server.");
          }
        } else {
          toast.error("Login failed: Invalid response status");
        }
      } else if (role === "teacher") {
        const response = await axios.post("https://ngp1-2.onrender.com/api/teacher/login", {
          email,
          password,
          role,
        });
  
        console.log("API Response for Teacher:", response);
  
        if (response.status === 200) {
          toast.success("Login successful!");
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
              navigate("/");
            }, 2000); // Delay navigation by 2 seconds
          } else {
            toast.error("No token received from server.");
          }
        } else {
          toast.error("Login failed: Invalid response status");
        }
      } else {
        toast.error("Invalid role selected");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  
  
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-200 to-green-200">
      <ToastContainer />
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
