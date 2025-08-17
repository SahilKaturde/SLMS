import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Pages/HomePage";
import BorrowedBooksPage from "./Pages/BorrowedBooksPage";
import PenaltiesPage from "./Pages/PenaltiesPage";
import SearchPage from "./Pages/SearchPage";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import ChatBot from "./Components/AI_bot/ChatBot";
import LibraryRegister from "./Pages/Entery_Point_L/LibraryRegister";
import LibraryLogin from "./Pages/Entery_Point_L/LibraryLogin";
import ProfilePage from "./Pages/For_User/ProfilePage";

function AppLayout() {
  const location = useLocation();
  
  // Hide sidebar and chatbot for login and register
  const hideUIRoutes = ["/login", "/register","/libraryRegister","/libraryLogin"];
  const hideUI = hideUIRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      {!hideUI && (
        <div className="fixed h-full z-50">
          <Sidebar />
        </div>
      )}
      
      {/* Main Content */}
      <div className={`flex-1 min-h-screen ${!hideUI ? "ml-0 md:ml-64" : ""}`}>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/borrowed" element={<BorrowedBooksPage />} />
            <Route path="/penalties" element={<PenaltiesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/libraryRegister" element={<LibraryRegister/>}/>
            <Route path="/libraryLogin" element={<LibraryLogin/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Routes>
        </div>
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