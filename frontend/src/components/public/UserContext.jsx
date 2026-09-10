import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({
            name: res.data.name || "User",
            email: res.data.email || "",
          });
        } catch (err) {
          console.error("Error fetching profile:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
          }
        }
      };
      fetchProfile();
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};