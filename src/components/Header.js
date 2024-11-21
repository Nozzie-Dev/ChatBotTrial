import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <h1 className="text-xl font-bold">AI Chat</h1>
      <div className="flex items-center space-x-2">
        <span>Johnson Doe</span>
        <FaUserCircle size={30} />
      </div>
    </header>
  );
}

export default Header;
