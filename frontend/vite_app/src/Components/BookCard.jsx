import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultBook = {
    title: "Unknown Book",
    author: "Unknown Author",
    publishedYear: "N/A",
    available: false,
    image: "https://via.placeholder.com/300x400?text=No+Cover",
    dueDate: new Date().toISOString().split('T')[0],
    ...book
  };

  const formatDueDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md w-full max-w-sm font-mono"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-[120%] bg-gray-100 overflow-hidden">
        <img
          src={defaultBook.image}
          alt={`Cover of ${defaultBook.title}`}
          className="absolute top-0 left-0 w-full h-full object-contain bg-white"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x400?text=No+Cover";
            e.target.className = "absolute top-0 left-0 w-full h-full object-contain bg-gray-100";
          }}
        />
        
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
          ${defaultBook.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {defaultBook.available ? 'AVAILABLE' : 'DUE ' + formatDueDate(defaultBook.dueDate)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-2 min-h-[2.5rem]">
          {defaultBook.title}
        </h3>
        <p className="text-gray-600 text-xs mb-1 line-clamp-1">{defaultBook.author}</p>
        <p className="text-xs text-gray-500">Published: {defaultBook.publishedYear}</p>
        
        <button
          className={`w-full mt-2 py-1.5 rounded text-xs transition-colors duration-300
            ${isHovered ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {defaultBook.available ? 'BORROW' : 'RENEW / RETURN'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;