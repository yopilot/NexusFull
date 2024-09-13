import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import HomePage from './pages/HomePage';
import ParsePage from './pages/FacultyForm';
import ChatbotPage from './pages/ChatBot';
import LoginPage from './pages/loginpage';
import './App.css';
import './Styles/global.css';
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={
          <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col p-8 relative overflow-y-auto">
              <Routes>
                <Route path="/Homepage" element={<HomePage />} />
                <Route path="/parse" element={<ParsePage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
              </Routes>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;