import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin One", email: "admin1@example.com" },
    { id: 2, name: "Admin Two", email: "admin2@example.com" },
  ]);

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const superadminId = "67a75f2904fb34bc331d6392"; // Replace with dynamic ID if needed
        const response = await axios.get(`https://ngp1-2.onrender.com/api/superadmin/getadmins/${superadminId}`);
        console.log(response.data);
        if (response.status === 200) {
          setAdmins(response.data.admins);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    getAllAdmins();
  }, []);

  const [newAdmin, setNewAdmin] = useState({
    superadminId: "67a75f2904fb34bc331d6392",
    name: "",
    email: "",
    password: "",
    collegeName: "",
    phone: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setNewAdmin({
      superadminId: "67a75f2904fb34bc331d6392",
      name: "",
      email: "",
      password: "",
      collegeName: "",
      phone: "",
    });
    setIsModalOpen(false);
  };

  const handleAddAdmin = async () => {
    if (newAdmin.name && newAdmin.email && newAdmin.password && newAdmin.collegeName && newAdmin.phone) {
      try {
        const response = await axios.post("https://ngp1-2.onrender.com/api/superadmin/addadmin", newAdmin);
        setAdmins([...admins, { id: admins.length + 1, ...newAdmin }]);
        setNewAdmin({
          superadminId: "67a75f2904fb34bc331d6392",
          name: "",
          email: "",
          password: "",
          collegeName: "",
          phone: ""
        });
        if(response.status === 201) {
          toast.success("Admin added successfully");
        } else if(response.status === 400) {
          toast.error("Admin already exists");
        } else {
          toast.error("Some error in adding");
        }
        setTimeout(() => {
          closeModal();
        }, 2000);
      } catch (error) {
        console.error("Error adding admin:", error);
        toast.warning("Email already exists");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      <div className="flex-1 p-8">
        <motion.h1 
          className="text-5xl font-extrabold text-indigo-600 text-center mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Superadmin Dashboard
        </motion.h1>

        {/* Total Admins Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <motion.div 
            className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg text-center border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-600">Total Admins</h2>
            <p className="text-4xl font-extrabold text-indigo-500">{admins.length}</p>
          </motion.div>
        </div>

        {/* Admin Management */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Manage Admins</h2>
            <button
              onClick={openModal}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-lg transition duration-300"
            >
              + Add Admin
            </button>
          </div>

          {/* Admin Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">College</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin._id} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-semibold">{admin.name}</td>
                  <td className="py-3 px-4 text-indigo-600">{admin.email}</td>
                  <td className="py-3 px-4">{admin.collegeName}</td>
                  <td className="py-3 px-4">{admin.phone}</td>
                  <td className="py-3 px-4">{new Date(admin.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Admin Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Admin</h2>
              {/* Form for adding new admin */}
              <input
                type="text"
                placeholder="Name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="College Name"
                value={newAdmin.collegeName}
                onChange={(e) => setNewAdmin({ ...newAdmin, collegeName: e.target.value })}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-end space-x-4">
                <button onClick={closeModal} className="bg-gray-400 text-white px-5 py-2 rounded-lg">Cancel</button>
                <button onClick={handleAddAdmin} className="bg-indigo-600 text-white px-5 py-2 rounded-lg">Add Admin</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default SuperAdminDashboard;
