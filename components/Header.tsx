
import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <button 
          onClick={onGoHome}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition-colors">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">PDF Prático</span>
        </button>
        <nav className="hidden md:flex gap-6">
          <button onClick={onGoHome} className="text-sm font-medium text-gray-600 hover:text-blue-600">Início</button>
          <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600">Segurança</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
