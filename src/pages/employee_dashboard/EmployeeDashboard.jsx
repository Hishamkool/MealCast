import React from "react";
import { useAuth } from "../../context/AuthContext";
import FoodCard from "../../components/FoodCard";
import "./EmployeeDashboard.css";
function EmployeeDashboard() {
  const { user } = useAuth();

  // if (!user) {
  //   return <div>User not found</div>;
  // }

  // if (!user.username) {
  //   return <div>User name empty</div>;
  // }
  //when user exists
  return (
    <div className="employee-dash">
      <h1>Hello, {user?.username}!</h1>
      <FoodCard />
    </div>
  );
}

export default EmployeeDashboard;
