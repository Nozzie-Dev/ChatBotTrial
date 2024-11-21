import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';
import SignUp from './components/Signup';
import Login from './components/Login';
import History from './components/History';

function App() {
  return (
    <Router>
      <Routes>
        {/* SignUp and Login */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Optional with Authentication for users */}
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* On both pages */}
              <Sidebar />

            
              <div className="flex-1 flex flex-col">
                
                <Header />

                {/* Dynamic Dashboard Routing*/}
                <Routes>
                  <Route path="/" element={<Navigate to="chat" replace />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="history" element={<History />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
