import React, { useState } from "react";
import API from "../api";
import Loader from "../componets/Loader";

import { motion } from "framer-motion";

export default function StatusCheckPage() {
  const url=import.meta.env.VITE_BACKEND_URL
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function check() {
    setLoading(true);
    try {
      const res = await API.get(`${url}/transaction/status/${id}`,{
         headers:{
           Authorization:`bearer ${localStorage.getItem("token")}`
        }
      });
      setStatus(res.data);
    } catch {
      alert("Failed to fetch status");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Check Transaction Status
      </h2>

      {/* 📝 Note */}
      <p className="mb-3 text-sm text-gray-600 italic">
        Please enter your <span className="font-semibold">Collect ID</span> to
        check the transaction status.
      </p>

      {/* Input + Button */}
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 
                     focus:outline-none transition"
          placeholder="Enter Collect ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          onClick={check}
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white rounded-lg 
                     font-medium shadow hover:bg-green-700 active:bg-green-800 
                     transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Check"}
        </button>
      </div>

      {/* Loader */}
    <div className="w-full max-w-2xl mx-auto">
  {loading && <Loader />}
</div>


      {/* Status Card */}
      {!loading && status && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-3"
        >
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Collect ID:</span>
            <span className="text-gray-800 font-mono">{status.collect_id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Status:</span>
            <span
              className={`font-semibold px-3 py-1 rounded-full text-sm ${
                status.status?.toLowerCase() === "success"
                  ? "bg-green-100 text-green-700"
                  : status.status?.toLowerCase() === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.status}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Amount:</span>
            <span className="text-gray-800">₹{status.amount}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">
              Transaction Amount:
            </span>
            <span className="text-gray-800">₹{status.transaction_amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Gateway:</span>
            <span className="text-gray-800">{status.gateway}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
