import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes/routes";

import Login from "./pages/login/Login";
import EmployeeDashboard from "./pages/employee_dashboard/EmployeeDashboard";
import AdminDashboard from "./pages/admin_dashboard/AdminDashboard";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import SnackBar from "./components/SnackBar/SnackBar";
import SetMenu from "./pages/admin_dashboard/SetMenuItems/SetMenu";

function App() {
  return (
    <>
      <SnackBar />
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.EMPLOYEE} element={<EmployeeDashboard />} />
        <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_SETMENU} element={<SetMenu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
