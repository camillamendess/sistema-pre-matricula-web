import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess";
import ForgotPassword from "./pages/ForgotPassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/primeiro-acesso" element={<FirstAccess />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
