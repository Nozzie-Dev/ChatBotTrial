import React, { useState } from 'react';
import axios from 'axios';
import { BsSend } from "react-icons/bs";

function Chat() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  // Can be fetched from db if signin was required
  const userId = 1; 

  const handleSend = async () => {
    if (input.trim()) {
      setChat((prevChat) => [
        ...prevChat,
        { prompt: input, response: 'Loading...' },
      ]);
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:5000/api/generate', {
          prompt: input,
          user_id: userId,
        });
        setChat(response.data.chat);
      } catch (error) {
        console.error('Error fetching response:', error);
        setChat((prevChat) => [
          ...prevChat.slice(0, prevChat.length - 1),
          { prompt: input, response: 'Error fetching response from the server' },
        ]);
      } finally {
        setLoading(false);
        setInput('');
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll p-4">
        {chat.map((c, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold text-blue-700">User:</div>
            <div className="bg-white p-2 rounded shadow-sm">{c.prompt}</div>
            <div className="font-bold mt-2 text-gray-700">AI:</div>
            <div
              className={`p-2 rounded ${
                c.response.startsWith('Error')
                  ? 'bg-red-200 text-red-700'
                  : 'bg-gray-200'
              }`}
            >
              {c.response}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-blue-500 mt-4">Fetching response...</div>
        )}
      </div>

      <div className="p-4 flex items-center border-t relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 pl-3 pr-10 border border-gray-300 rounded shadow-sm"
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="absolute right-9 top-1/2 transform -translate-y-1/2 text-gray-500"
          disabled={loading}
        >
          <BsSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
