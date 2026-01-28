import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes.js";
import { useAuth } from "../../context/AuthContext.jsx";

import "./Login.css";
import "../../styles/forms.css";
import "../../styles/buttons.css";
import { SnackBarContext } from "../../context/SnackBarContext.jsx";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const { login } = useAuth();
  const { showSnackBar, variant } = useContext(SnackBarContext);

  function handleLogin() {
    if (!username) {
      showSnackBar("Please enter you username", "error");
      return;
    }
    if (!role) {
      showSnackBar("Please select a valid role");
      return;
    }
    login(username, role);
    if (role === "admin") {
      navigate(ROUTES.ADMIN);
    } else if (role === "employee") {
      navigate(ROUTES.EMPLOYEE);
    }
  }

  return (
    <div className="login-body">
      <h2>MealCast</h2>

      <div className="login-container">
        <span className="login-txt">Login</span>
        <form className="login-form">
          <label htmlFor="user-name">Username:</label>
          <input
            className="input-base"
            id="user-name"
            type="text"
            placeholder="Enter name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="phone">Phone number:</label>
          <input
            className="input-base"
            id="phone"
            type="number"
            placeholder="Enter 10 digits"
            maxLength={10}
            onChange={null} //set this
          />

          <label htmlFor="select-role">Select Role:</label>
          <select
            id="select-role"
            className="input-base select-base"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="admin">Mess Admin</option>
            <option value="employee">Employee</option>
          </select>
        </form>
        <button className="btn-base" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
export default Login;
