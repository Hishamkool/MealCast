import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// wrapping with provider
function AuthProvider({ children }) {
  // set user useState
  const [user, setUser] = useState(null);

  const login = (username, role) => {
    setUser({ username, role });
    console.log(`set current user : username: '${username}' , role: '${role}'`);
  };
  //logging out
  const logout = () => {
    setUser(null);
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
