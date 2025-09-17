import React, { useState } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const url=import.meta.env.VITE_BACKEND_URL
 const [user,setuser]  =useState({
    name:"",email:"",password:""
  })
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();


const handlechange=(e)=>{
 const {name,value}=e.target;
  setuser({
    ...user,
    [name]:value
  })
}


  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log(user);
      localStorage.setItem("user",JSON.stringify(user))
    const res = await API.post(`${url}/user/register`, user).catch(err => err.response);
console.log(res.data);

 
      alert(res.data.msg );
      nav("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create an Account
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handlechange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       focus:outline-none transition"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handlechange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       focus:outline-none transition"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handlechange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-200
            ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-6 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Login
        </a>
      </p>
    </div>
  </div>
);

}
