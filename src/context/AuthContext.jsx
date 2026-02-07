import { createContext, useContext, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";

const AuthContext = createContext(null);

// wrapping with provider
function AuthProvider({ children }) {
  // set user useState
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH.USER);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username, role) => {
    const userData = { username, role };
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.AUTH.USER, JSON.stringify(userData));
    console.log(`set current user : username: '${username}' , role: '${role}'`);
  };
  //logging out
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH.USER);
    console.log(`User logged out`);
  };
  return (
    <AuthContext.Provider value={{ login, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// function to use the defined auth context
function useAuth() {
  return useContext(AuthContext);
}
export { AuthProvider, useAuth };
