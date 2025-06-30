import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from '../layout/LoginLayout';
import DashboardLayout from "../layout/DashboardLayout";
import Login from '../pages/login/Login';
import Dashboard from '../pages/dasboard/Dashboard';
import Tabel from "../pages/tabel/Tabel";
import Student from '../pages/Students/index';
// @ts-ignore
import Registration from '../pages/Students/Registration/index';
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import '../App.css';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tabel" element={<Tabel />} />
           <Route path="students" element={<Student />} />
            <Route path="students/registration" element={<Registration />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
