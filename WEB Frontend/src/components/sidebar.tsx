import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 h-full bg-[#1a1625] text-white flex flex-col relative overflow-hidden">
            <div className="w-[200%] h-[200%] bg-gradient-to-br from-pink-300 via-purple-500 to-purple-800 rounded-full absolute -left-1/2 -top-1/2 opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[#1a1625] opacity-70"></div>
            <div className="relative z-10 flex flex-col h-full p-6">
                <h1 className="text-5xl font-bold text-pink-300 mb-16">Nex.us</h1>
                <nav className="flex-grow">
                    <ul className="space-y-4">
                        <li>
                            <Link to="/Homepage" className="flex items-center text-white opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/parse" className="flex items-center text-white opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Add Member
                            </Link>
                        </li>
                        <li>
                            <Link to="/chatbot" className="flex items-center text-white opacity-60 hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Chatbot
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                {/* Add dummy account profile at the bottom */}
                <div className="mt-auto pt-4 border-t border-gray-700 flex items-center">
                <img src="src\assets\image.png" alt="John Doe" className="w-10 h-10 rounded-full mr-3 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium">Yogesh Sharma</p>
                        <p className="text-xs text-gray-400">yogesh@nex.us</p>
                    </div>
                </div>
            </div>
            
            {/* Add copyright notice */}
            <div className="relative z-10 p-4 text-center">
                <p className="text-xs text-gray-500">© 2024 Nex.us. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar;