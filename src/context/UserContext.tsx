import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../utils/api";

// Define user type
interface User {
  _id: string;
  name: string;
  email: string;
  role?: "Admin" | "User";
  isAdmin?: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Context type
interface UserContextType {
  user: User | null;
  login: (userData: LoginCredentials) => Promise<User | undefined>;
  register: (userData: RegisterCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
}

// Create context with placeholder functions
const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => undefined,
  register: async () => {},
  logout: () => {},
  loading: true,
  isAdmin: false,
});

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for token on load
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      // Only parse if both token and storedUser exist and storedUser is not "undefined"
      if (token && storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Optionally verify token with backend here
      } else if (!token || !storedUser) {
        // Clear incomplete data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
      // Clear corrupted data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log("Attempting login with email:", credentials.email);
      const response = await api.post("/auth/login", credentials);
      console.log("Login response:", response.data);

      // Get user data from backend response
      const userData = response.data.data;
      const token = response.data.token;

      if (!userData || !token) {
        throw new Error(
          "Invalid response from server: missing user data or token"
        );
      }

      // Create user object with required fields
      const user: User = {
        _id: userData._id,
        name: userData.name || "User",
        email: userData.email,
        role: userData.role || "User",
        isAdmin: userData.role === "Admin" || userData.isAdmin === true,
      };

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context
      setUser(user);

      console.log("Login successful for user:", user.email);
      return user;
    } catch (error) {
      console.error("Login failed:", error);

      // Re-throw error so it can be caught in the component
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      // Register
      const response = await api.post("/auth/register", credentials);
      console.log("Register response:", response.data);

      const userData = response.data.data; // Backend returns user in data.data
      const token = response.data.token;

      // Ensure user has required fields
      const user: User = {
        _id: userData._id,
        name: userData.name || "User",
        email: userData.email,
        role: userData.role || "User",
        isAdmin: userData.role === "Admin" || userData.isAdmin === true,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = user?.role === "Admin" || user?.isAdmin === true;

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, loading, isAdmin }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
