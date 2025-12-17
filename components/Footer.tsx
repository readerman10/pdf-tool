
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 max-w-5xl text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PDF Prático. Processamento 100% Local.</p>
        <p className="mt-2">Suas informações e arquivos nunca saem do seu navegador.</p>
      </div>
    </footer>
  );
};

export default Footer;
