import React, { useState,useContext  } from "react";
import API, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authcontext";

export default function LoginPage() {
  const url=import.meta.env.VITE_BACKEND_URL
  const { login ,setToken} = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(`${url}/user/login`, { email, password });
      const token = res.data?.token;
      console.log(res.data);
      if(res.data.msg){

        alert(res.data.msg)
        
      }
    
      if(token){
          localStorage.setItem("token", token);
      setToken(token);
        login(token); 
        nav("/transactions");
      }
    } catch(err) {
  console.log(err); // see backend response
  alert(err.response?.data?.error || "Login failed");
} finally {
      setLoading(false);
    }
  }

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Login to Your Account
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       focus:outline-none transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       focus:outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-6 text-center">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign up
        </a>
      </p>
    </div>
  </div>
);

}
