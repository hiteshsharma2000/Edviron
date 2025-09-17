import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Authcontext";

export default function Dashboard() {
  const val=useContext(AuthContext)
  console.log(val);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
    
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-700 text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        School Payment System
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-gray-700 text-center mb-8 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        Manage payments, check transactions, and track status easily and securely.
      </motion.p>

   
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a
          href="/create-payment"
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold text-lg shadow-lg hover:bg-green-700 transition-colors duration-300 text-center"
        >
          Create Payment
        </a>
        <a
          href="/transactions"
          className="px-6 py-3 rounded-lg bg-green-100 text-green-700 font-semibold text-lg shadow-lg hover:bg-green-200 transition-colors duration-300 text-center"
        >
          View Transactions
        </a>
      </motion.div>
    </div>
  );
}
