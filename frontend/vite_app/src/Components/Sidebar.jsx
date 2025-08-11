import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false); // closed on mobile by default
      } else {
        setIsOpen(true); // open on desktop by default
      }
    }
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex font-mono">
      {/* Small green dot toggle button on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`
            fixed top-4 left-4 z-30
            w-4 h-4 rounded-full
            ${isOpen ? "bg-green-600" : "bg-green-400"}
            shadow-lg
            focus:outline-none
            transition-colors duration-300
          `}
          aria-label="Toggle sidebar"
          title={isOpen ? "Close menu" : "Open menu"}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white text-black shadow-lg z-20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-64 md:flex-shrink-0
          w-64
          flex flex-col
        `}
        style={{ maxHeight: "100vh" }}
      >
        <div className="p-6 text-2xl font-normal border-b border-gray-300 flex items-center gap-3">
          {/* Toggle button only on desktop */}
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-xl cursor-pointer focus:outline-none"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <i className="ri-menu-fill"></i>
            </button>
          )}
          <span
            className={`transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            SLMS
          </span>
        </div>

        {/* Scrollable navigation */}
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {[
            { icon: "ri-home-2-line", text: "Home" },
            { icon: "ri-book-2-line", text: "Borrowed Books" },
            { icon: "ri-alert-line", text: "Penalties & Notices" },
          ].map((item) => (
            <a
              key={item.text}
              href="#"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            >
              <i className={`${item.icon} text-lg`}></i>
              <span
                className={`transition-all duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0 absolute"
                }`}
              >
                {item.text}
              </span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300">
          <button className="flex items-center gap-3 w-full p-2 rounded hover:bg-gray-100 transition-colors duration-300 ease-in-out">
            <i className="ri-logout-box-line text-lg"></i>
            <span
              className={`transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
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