import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Pages/HomePage";
import BorrowedBooksPage from "./Pages/BorrowedBooksPage";
import PenaltiesPage from "./Pages/PenaltiesPage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";

function AppLayout() {
  const location = useLocation();
  
  // Hide sidebar for login and register
  const hideSidebarRoutes = ["/login", "/register"];
  const hideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className={`flex-1 ${!hideSidebar ? "ml-0 md:ml-64 p-4" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/borrowed" element={<BorrowedBooksPage />} />
          <Route path="/penalties" element={<PenaltiesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
