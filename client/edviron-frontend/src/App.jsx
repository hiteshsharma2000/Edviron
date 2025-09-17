import React from "react";
import { Routes, Route, } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePaymentPage from "./pages/CreatePaymentPage";
import TransactionsPage from "./pages/TransactionsPage";
import SchoolTransactionsPage from "./pages/SchoolTransactionsPage";
import StatusCheckPage from "./pages/StatusCheckPage";
import Nav from "./componets/Navbar";
import Dashboard from "./pages/Dashboard";



export default function App() {
  console.log('hi');
  
  return (
    <div className=" w-full min-h-screen ">
      <Nav/>
      <br />
      <br />
      <br />
      <div className=" mx-auto w-full p-4  w-full bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-payment" element={<CreatePaymentPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/school" element={<SchoolTransactionsPage />} />
          <Route path="/status" element={<StatusCheckPage />} />
        </Routes>
      </div>
    </div>
  );
}
