import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navItems = [
    { icon: "ri-home-2-line", text: "Home", path: "/" },
    { icon: "ri-book-2-line", text: "Borrowed Books", path: "/borrowed" },
    { icon: "ri-alert-line", text: "Penalties & Notices", path: "/penalties" },
    { icon: "ri-search-line", text: "Search", path: "/search" },
  ];

  return (
    <div className="flex font-mono">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-30 w-4 h-4 rounded-full ${
            isOpen ? "bg-green-600" : "bg-green-400"
          } shadow-lg focus:outline-none transition-colors duration-300`}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-white text-black shadow-lg z-20 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}
          md:relative flex flex-col`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="p-6 text-2xl font-normal border-b border-gray-300 flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-xl cursor-pointer focus:outline-none"
          >
            <i className="ri-menu-fill"></i>
          </button>
          <span
            className={`whitespace-nowrap transition-all duration-300 ${
              isOpen ? "opacity-100 ml-0" : "opacity-0 ml-4 absolute"
            }`}
          >
            SLMS
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.text}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              <i className={`${item.icon} text-lg`}></i>
              <span
                className={`whitespace-nowrap transition-all duration-300 ${
                  isOpen ? "opacity-100 ml-0" : "opacity-0 ml-4 absolute"
                }`}
              >
                {item.text}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300">
          <button className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100 transition-colors duration-300 ease-in-out">
            <i className="ri-logout-box-line text-lg"></i>
            <span
              className={`whitespace-nowrap transition-all duration-300 ${
                isOpen ? "opacity-100 ml-0" : "opacity-0 ml-4 absolute"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
