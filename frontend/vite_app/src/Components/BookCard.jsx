import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default book data with your provided image
  const defaultBook = {
    title: "Sample Book Title",
    author: "Author Name",
    publishedYear: "2023",
    available: true,
    image: "https://imgv2-1-f.scribdassets.com/img/word_document/342870203/original/0f5318de2d/1571483150?v=1",
    ...book // Override with passed props
  };

  return (
    <div
      className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md font-mono"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Cover with your provided image */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        <img
          src={defaultBook.image}
          alt={defaultBook.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' viewBox='0 0 200 250'%3E%3Crect fill='%23f3f4f6' width='200' height='250'/%3E%3Ctext fill='%236b7280' font-family='monospace' font-size='16' x='20' y='120'%3ENo Cover%3C/text%3E%3C/svg%3E"
          }}
        />
        
        {/* Status Badge - matches sidebar's green dot color */}
        <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium
          ${defaultBook.available ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}
        >
          {defaultBook.available ? 'AVAILABLE' : 'ON LOAN'}
        </span>
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{defaultBook.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{defaultBook.author}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-500">
            {defaultBook.publishedYear}
          </span>
          
          {/* Action Button - matches sidebar's green accent */}
          <button
            className={`px-3 py-1 rounded text-xs transition-all duration-300
              ${defaultBook.available 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
          >
            {defaultBook.available ? 'BORROW' : 'DETAILS'}
          </button>
        </div>
      </div>

      {/* Hover Overlay - subtle like sidebar interactions */}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-3 pointer-events-none transition-opacity duration-300"></div>
      )}
    </div>
  );
};

// Example BookGrid component to display multiple cards
const BookGrid = ({ books }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

// Example usage with your provided image
const ExampleBookList = () => {
  const sampleBooks = [
    {
      title: "Computer Science Principles",
      author: "Kevin Hare",
      publishedYear: "2021",
      available: true
    },
    {
      title: "Advanced React Patterns",
      author: "React Team",
      publishedYear: "2023",
      available: false,
      image: "https://example.com/another-book.jpg" // This will fall back to default
    },
    // Add more books as needed
  ];

  return <BookGrid books={sampleBooks} />;
};

export default BookCard;
export { BookGrid, ExampleBookList };