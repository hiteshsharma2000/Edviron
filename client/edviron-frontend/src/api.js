import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./Authcontext";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000/",
});

export function setAuthToken(token) {
  const val=useContext(AuthContext)
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${val.token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

export default API;
