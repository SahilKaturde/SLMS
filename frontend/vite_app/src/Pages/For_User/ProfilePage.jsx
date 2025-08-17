import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Sample data
  const userData = {
    name: "Johnathan Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    library: "Central City Library",
    memberSince: "Jan 15, 2023",
    borrowedBooks: 3,
    penalties: 1,
    readingPreferences: ["Fiction", "Science", "History", "Biography"],
    profileImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
    recentActivity: [
      { type: "borrow", title: "The Silent Patient", date: "2 days ago" },
      { type: "return", title: "Atomic Habits", date: "1 week ago" },
      { type: "renew", title: "Deep Work", date: "3 weeks ago" }
    ]
  };

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  // Styling with only black and white
  const cardClass = "border-4 border-black p-4 sm:p-6 rounded-xl bg-white w-full";
  const btnPrimary = "w-full p-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition";
  const btnGhost = "px-4 py-2 border-2 border-black rounded font-bold hover:bg-black hover:text-white transition";

  return (
    <div className="bg-white font-mono text-[15px] text-black min-h-screen">
      {/* Header inside main content area */}
      <div className="border-b-4 border-black p-4 sticky top-0 z-10 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary */}
            <div className={cardClass}>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-black mb-4">
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-center">{userData.username}</h2>
                <p className="text-gray-600 text-xs sm:text-sm text-center">{userData.email}</p>
              </div>

              <div className="mt-6 space-y-3 text-sm sm:text-base">
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium">Full Name:</span>
                  <span className="text-right">{userData.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium">Library:</span>
                  <span className="text-right">{userData.library}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium">Member Since:</span>
                  <span className="text-right">{userData.memberSince}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="font-medium">Borrowed Books:</span>
                  <span className="font-bold text-right">{userData.borrowedBooks}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Penalties:</span>
                  <span className={`font-bold text-right ${userData.penalties > 0 ? "text-black" : "text-black"}`}>
                    {userData.penalties}
                  </span>
                </div>
              </div>
            </div>

            {/* Reading Preferences */}
            <div className={cardClass}>
              <h2 className="text-lg font-bold mb-4">Reading Preferences</h2>
              <div className="flex flex-wrap gap-2">
                {userData.readingPreferences.map((pref, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-black text-xs sm:text-sm font-medium rounded-full border border-black"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Activity and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className={cardClass}>
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 sm:mr-4 ${
                      activity.type === 'borrow' ? 'bg-gray-100 border border-black' : 
                      activity.type === 'return' ? 'bg-gray-100 border border-black' : 'bg-gray-100 border border-black'
                    }`}>
                      {activity.type === 'borrow' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                      ) : activity.type === 'return' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm sm:text-base">
                        {activity.type === 'borrow' ? 'Borrowed' : 
                         activity.type === 'return' ? 'Returned' : 'Renewed'} 
                        "{activity.title}"
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={cardClass}>
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => navigate("/borrowed")}
                  className="p-2 sm:p-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Borrowed Books
                </button>
                <button
                  onClick={() => navigate("/search")}
                  className="p-2 sm:p-3 bg-white text-black font-bold rounded border-2 border-black hover:bg-black hover:text-white transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Search Books
                </button>
                <button
                  onClick={() => navigate("/penalties")}
                  className="p-2 sm:p-3 bg-white text-black font-bold rounded border-2 border-black hover:bg-black hover:text-white transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  View Penalties
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 sm:p-3 bg-black text-white font-bold rounded hover:bg-gray-800 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;