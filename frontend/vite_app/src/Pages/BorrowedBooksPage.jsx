import React, { useState, useEffect } from 'react';
import BookCard from '../Components/BookCard';

function BorrowedBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const mockData = [
          {
            id: 1,
            title: "Computer Science Principles",
            author: "Kevin Hare",
            publishedYear: "2021",
            available: false,
            image: "https://imgv2-1-f.scribdassets.com/img/word_document/342870203/original/0f5318de2d/1571483150?v=1",
            dueDate: "2023-12-15"
          },
          {
            id: 2,
            title: "Advanced React Patterns",
            author: "React Team",
            publishedYear: "2023",
            available: false,
            image: "https://i.pinimg.com/736x/c2/c2/76/c2c2769377ad5215261c29238ed726bb.jpg",
            dueDate: "2023-11-30"
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBooks(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-8 font-mono">
        <h1 className="text-2xl font-bold mb-6">Your Borrowed Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-lg animate-pulse h-[420px]"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8 font-mono">
        <h1 className="text-2xl font-bold mb-6">Your Borrowed Books</h1>
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          Error loading books: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 font-mono">
      <h1 className="text-2xl font-bold mb-6">Your Borrowed Books</h1>
      {books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't borrowed any books yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BorrowedBooksPage;