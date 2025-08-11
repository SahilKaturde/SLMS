import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Home';
import Login from '../src/Pages/Login';
import Register from '../src/Pages/Register';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="div">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
