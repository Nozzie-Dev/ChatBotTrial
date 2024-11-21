import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiMicrophoneOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { GrChatOption } from "react-icons/gr";

const History = () => {
  const [chats, setChats] = useState([]);
  const [totalPrompts, setTotalPrompts] = useState(0);

  // Time calculating function
  const timeAgo = (timestamp) => {
    const now = new Date();
    const chatDate = new Date(timestamp);
    const difference = now - chatDate;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/history', {
          user_id: '1', 
        });
        setChats(response.data.chatHistory);
        setTotalPrompts(response.data.totalPrompts);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  // Function to clear chat history
  const clearChatHistory = async () => {
    // Clear chat history from the local state
    setChats([]);
    setTotalPrompts(0);

    {/* Clear chat history on the server
    try {
      await axios.post('http://localhost:5000/api/clear-history', {
        user_id: '1', 
      });
      console.log('Chat history cleared on the server');
    } catch (error) {
      console.error('Error clearing chat history on the server:', error);
    }*/}
  };

  return (
    <div className="p-6 h-screen flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Get answers in seconds</h2>
      <p className="text-sm text-gray-600 mb-6">Create and complete tasks using boards</p>

      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col flex-grow">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Search History</h3>
          <button
            onClick={clearChatHistory}
            className="text-sm text-purple-600 hover:underline"
          >
            Clear Chat History
          </button>
        </div>

        
        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div key={index} className="flex items-center bg-gray-100 p-3 rounded-lg hover:bg-purple-100">
                  <div>
                    <p className="text-gray-800">{chat.prompt}</p>
                    <p className="text-gray-500 text-sm">
                      {timeAgo(chat.timestamp)} • {totalPrompts} total prompts
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 flex items-center">
                <GrChatOption className="text-purple-500 text-xl mr-2"/>
                <strong>No Questions Added</strong> Type your questions below and get fast responses.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600 text-sm mb-2">Chat Suggestions</p>
        <div className="flex space-x-2">
          {['Write JS code for it', 'Explain more', 'More info'].map((suggestion, idx) => (
            <button
              key={idx}
              className="px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 relative">
        <div className="flex items-center w-full p-3 border border-gray-300 rounded-lg mt-2">
          <input
            type="text"
            placeholder="Type new questions"
            className="flex-grow p-2 border-none outline-none"
          />
          <CiMicrophoneOn className="text-xl text-gray-500 mr-3 cursor-pointer" />
          <BsSend className="text-xl text-purple-600 cursor-pointer" />
        </div>

        <div className="absolute -bottom-2 left-0 right-0 bg-purple-600 text-white text-xs py-1 text-center rounded-t-lg">
          All the results are generated by AI. If you get any wrong answers,{' '}
          <a href="/" className="underline">report here</a>.
        </div>
      </div>
    </div>
  );
};

export default History;
