import React, { useContext, useState } from "react";
import API from "../api";

import { motion } from "framer-motion";
import { AuthContext } from "../Authcontext";

export default function SchoolTransactionsPage() {
const url=import.meta.env.VITE_BACKEND_URL
  const {token}=useContext(AuthContext)
  const [schoolId, setSchoolId] = useState("");
  const [items, setItems] = useState([]);

  async function fetchBySchool() {
    try {
      const res = await API.get(`${url}/transaction/school/${schoolId}`,{
        headers:{
             Authorization:`bearer ${token}`
        }
      });
      console.log(res);
      if(res.data.length===0){
        alert("No transactions found for this school ID");
      }
      setItems(res.data);
    } catch {
      alert("Failed to load transactions");
    }
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      Transactions by School
    </h2>

    {/* Input & Button */}
    <div className="flex gap-2 mb-6">
      <input
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   focus:outline-none transition"
        placeholder="Enter School ID"
        value={schoolId}
        onChange={(e) => setSchoolId(e.target.value)}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchBySchool}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg 
                   font-medium shadow hover:bg-blue-700 active:bg-blue-800 
                   transition-colors"
      >
        Fetch
      </motion.button>
    </div>

    {/* Transactions List - Full Width */}
    <div className=" shadow rounded-lg divide-y">
      {items.length > 0 ? (
        items.map((t) => (
          <motion.div
            key={t.collect_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 flex justify-between items-center m-[5px] hover:bg-gray-50 transition bg-white transition-all duration-200 hover:shadow-lg hover:scale-[1.01] shadow-lg rounded-lg"
          >
            <span className="font-mono text-sm text-gray-700">
              {t.collect_id}
            </span>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                t.status === "success"
                  ? "bg-green-100 text-green-700"
                  : t.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {t.status.toUpperCase()}
            </span>
          </motion.div>
        ))
      ) : (
        <p className="p-6 text-gray-500 text-center">No transactions found.</p>
      )}
    </div>
  </div>
);
}
