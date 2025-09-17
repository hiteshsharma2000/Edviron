import React, { useEffect, useState } from "react";
import API from "../api";

export default function TransactionsPage() {
  const url=import.meta.env.VITE_BACKEND_URL
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("order_amount"); // order_amount, transaction_amount, payment_time, status
  const [sortOrder, setSortOrder] = useState("desc"); // asc or desc

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get(`${url}/transaction`,
             {
             headers:{
               Authorization:`bearer ${localStorage.getItem("token")}`
             }  , 
          params: { page, limit, sort: sortField, order: sortOrder },
        });
        console.log(res.status);
        const data = res.data.items || res.data;
        // console.log(data);
        
        setTransactions(data);
        setTotalPages(Math.ceil((res.data.total || data.length) / limit));
      } catch (err){
        console.log(err);
        if(err.status===401){
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          window.location.href="/login"
        }else{
        
        alert("Failed to fetch transactions");
      }}
    }
    fetchData();
  }, [page, limit, sortField, sortOrder]);

 return (
  <div className="w-full px-4 py-6 bg-gray-100 min-h-screen">
    <h2 className="text-xl font-semibold text-center mb-4">Transactions</h2>

    {/* Sorting Controls */}
    <div className="flex flex-col sm:flex-row sm:justify-end items-start sm:items-center gap-3 mb-6">
      <label className="text-sm">Sort by:</label>
      <div className="flex gap-2">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="order_amount">Order Amount</option>
          <option value="transaction_amount">Transaction Amount</option>
          <option value="payment_time">Payment Time</option>
          <option value="status">Status</option>
        </select>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>

    {/* Table (desktop & tablet) */}
    <div className="hidden sm:block overflow:hidden">
      <table className="w-full text-sm border-separate border-spacing-y-1">
        <thead className="bg-yellow-50 text-left shadow-md rounded-lg">
          <tr>
            <th className="py-3 px-3 rounded-l-lg">Student Name</th>
            <th className="py-3 px-3">Collect ID</th>
            <th className="py-3 px-3">School</th>
            <th className="py-3 px-3">Gateway</th>
            <th className="py-3 px-3">Amount</th>
            <th className="py-3 px-3">Transaction Amount</th>
            <th className="py-3 px-3 rounded-r-lg">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {transactions.map((t) => (
          <tr
  key={t.collect_id}
  className="bg-white transition-all duration-200 hover:shadow-lg hover:scale-[1.01] shadow-md rounded-lg mb-2"
>
  <td className="py-4 px-4">{t.student_info.name}</td>
  <td className="py-4 px-4">{t.collect_id}</td>
  <td className="py-4 px-4">{t.school_id}</td>
  
  <td className="py-4 px-4">{t.gateway || "NA"}</td>
  <td className="py-4 px-4">{t.order_amount}</td>
  <td className="py-4 px-4">{t.transaction_amount}</td>
  <td
    className={`py-4 px-4 font-semibold ${
      t.status === "success" ? "text-green-600" : "text-yellow-600"
    }`}
  >
    {t.status.toUpperCase()}
  </td>
</tr>

          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards (for very small screens) */}
    <div className="sm:hidden space-y-3">
      {transactions.map((t) => (
        <div
          key={t.collect_id}
          className="bg-white p-4 rounded-lg shadow-md text-sm"
        >
          <p><span className="font-semibold">Student:</span> {t.student_info.name}</p>
          <p><span className="font-semibold">Collect ID:</span> {t.collect_id}</p>
          <p><span className="font-semibold">School:</span> {t.school_id}</p>
          <p><span className="font-semibold">Gateway:</span> {t.gateway || "NA"}</p>
          <p><span className="font-semibold">Amount:</span> {t.order_amount}</p>
          <p><span className="font-semibold">Transaction:</span> {t.transaction_amount}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                t.status === "success"
                  ? "text-green-600 font-semibold"
                  : "text-yellow-600 font-semibold"
              }
            >
              {t.status.toUpperCase()}
            </span>
          </p>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-6">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  </div>
);

}
