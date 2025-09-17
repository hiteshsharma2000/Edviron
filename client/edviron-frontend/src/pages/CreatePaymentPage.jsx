import React, { useContext, useState } from "react";
import API from "../api";

import { motion, AnimatePresence } from "framer-motion";
import Loader from "../componets/Loader";
import { AuthContext } from "../Authcontext";


export default function CreatePaymentPage() {
  const val=useContext(AuthContext)
  const url=import.meta.env.VITE_BACKEND_URL
  
  const [amount, setAmount] = useState("100");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("https://google.com");

  async function createPayment(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(`${url}/payments/create`, {
        amount,
        callback_url: callbackUrl,
        student_info: JSON.parse(localStorage.getItem("user")) || { name: "Rahul Sharma", id: "STU010",email: "rahul@example.com" },
      },{
       Authorization:`bearer ${localStorage.getItem("token")}`
      }
    
    );
      // console.log(res.config);
      if(res.config.Authorization=="bearer "){
        alert("Please login first")
        setLoading(false);
        return;
      }
        setLoading(false);
        if(val.token){
        setSuccess(true);

      }else{
        alert("Please login first")
      }
      
    // setTimeout(()=>{

    //   window.location.href = "/";
    // },500)
    } catch(err) {
      console.log(err);
    
      alert("Failed to create payment");
      
    }finally{
      setLoading(false);
    }
  }
 

 return( loading ? ( <Loader/> ) : (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Payment
        </h2>

        <form onSubmit={createPayment} className="space-y-4">
        
           <input
      type="number"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      required
      min="1" // value should be greater than 0
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                 focus:outline-none transition"
    />
    <p className="mt-1 text-sm text-gray-500 italic">
      💡 Amount should be greater than 0
    </p>

          <input
            type="url"
            placeholder="Callback URL"
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-green-500 focus:border-green-500 
                       focus:outline-none transition"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-lg text-white font-medium 
                       bg-green-600 hover:bg-green-700 active:bg-green-800 
                       transition-colors duration-200"
          >
            Pay Now
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Success Popup */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white p-8 rounded-2xl shadow-xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100"
              >
                <span className="text-green-600 text-3xl">✔</span>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800">
                Order Created Successful!
              </h3>
              <p className="text-gray-600 mt-2">
                Your order has been created successfully.
              </p>
             <button
  onClick={() => {
    setSuccess(false);
    window.location.href = "/";
  }}
  className="mt-6 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
>
  Close
        </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div> )
    
      )

}
