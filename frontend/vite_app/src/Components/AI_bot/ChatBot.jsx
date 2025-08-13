import React, { useState, useRef, useEffect } from 'react';
import botLogo from '../../assets/images/ai_bot.png';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your library assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking and replying
    setTimeout(() => {
      const botResponses = [
        "I can help you find books, check availability, and answer library questions.",
        "Try asking about book availability or due dates.",
        "Our library has over 50,000 titles available for checkout.",
        "You can renew books online up to 3 times.",
        "The current bestseller collection is on display near the entrance."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="font-mono">
      {/* Chatbot Toggle Button */}
      <div
        className={`fixed bottom-6 right-6 cursor-pointer transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <img
            src={botLogo}
            alt="Library Assistant"
            className="w-14 h-14 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white p-2"
          />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={botLogo} alt="Bot" className="w-6 h-6" />
              <span className="font-semibold text-sm">Library Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-80 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-2">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 px-3 py-2 text-sm outline-none border border-gray-200 rounded-l focus:border-gray-400"
                placeholder="Ask about books, due dates..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;