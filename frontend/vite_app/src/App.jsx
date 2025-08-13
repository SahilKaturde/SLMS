import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Pages/HomePage";
import BorrowedBooksPage from "./Pages/BorrowedBooksPage";
import PenaltiesPage from "./Pages/PenaltiesPage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import ChatBot from "./Components/AI_bot/ChatBot";// <-- Import the chatbot component

function AppLayout() {
  const location = useLocation();
  
  // Hide sidebar and chatbot for login and register
  const hideUIRoutes = ["/login", "/register"];
  const hideUI = hideUIRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideUI && <Sidebar />}
      <div className={`flex-1 ${!hideUI ? "ml-0 md:ml-64 p-4" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/borrowed" element={<BorrowedBooksPage />} />
          <Route path="/penalties" element={<PenaltiesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      {/* Chatbot appears on all pages except login/register */}
      {!hideUI && <ChatBot />}
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
