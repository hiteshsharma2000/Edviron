// Nav.js
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authcontext"; 

function Nav() {
  const { token, logout } = useContext(AuthContext); 
  const [isOpen, setIsOpen] = useState(false);

  // logout function
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow p-3 z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="font-bold text-lg text-green-700">
          School Payment
        </Link>

      
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex sm:items-center sm:gap-4">
          <Link to="/" className="font-bold p-2 rounded-lg shadow-md bg-green-50">
            Dashboard
          </Link>
          {token && (
            <>
              <Link to="/create-payment" className="font-bold p-2 rounded-lg shadow-md bg-green-50">
                Create Payment
              </Link>
              <Link to="/transactions" className="font-bold p-2 rounded-lg shadow-md bg-green-50">
                Transactions
              </Link>
              <Link to="/school" className="font-bold p-2 rounded-lg shadow-md bg-green-50">
                By School
              </Link>
              <Link to="/status" className="font-bold p-2 rounded-lg shadow-md bg-green-50">
                Check Status
              </Link>
            </>
          )}
        </div>

    {/* button appears based on user login or not */}
        <div className="hidden sm:flex sm:items-center sm:gap-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded hover:bg-green-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded hover:bg-green-100 transition">
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 border rounded hover:bg-green-100 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-2 flex flex-col gap-2 bg-white p-2 shadow-md rounded">
          <Link to="/" className="font-bold p-2 rounded-lg bg-green-50" onClick={()=>setIsOpen(false)}>
            Dashboard
          </Link>
          {token && (
            <>
              <Link to="/create-payment" className="font-bold p-2 rounded-lg bg-green-50" onClick={()=>setIsOpen(false)}>
                Create Payment
              </Link>
              <Link to="/transactions" className="font-bold p-2 rounded-lg bg-green-50" onClick={()=>setIsOpen(false)}>
                Transactions
              </Link>
              <Link to="/school" className="font-bold p-2 rounded-lg bg-green-50" onClick={()=>setIsOpen(false)}>
                By School
              </Link>
              <Link to="/status" className="font-bold p-2 rounded-lg bg-green-50" onClick={()=>setIsOpen(false)}>
                Check Status
              </Link>
            </>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded hover:bg-green-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 border rounded hover:bg-green-100 transition" onClick={()=>setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="px-3 py-1 border rounded hover:bg-green-100 transition" onClick={()=>setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;