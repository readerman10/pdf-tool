
import React from 'react';
import { ToolMode } from '../types';

interface HomeProps {
  onSelectMode: (mode: ToolMode) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Simples, Rápido e <span className="text-blue-600">Privado.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ferramentas de PDF que rodam inteiramente no seu navegador. Privacidade total para seus documentos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <button 
          onClick={() => onSelectMode(ToolMode.MERGE)}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Juntar PDF</h2>
          <p className="text-gray-600">Mescle vários arquivos em um único documento PDF em segundos.</p>
        </button>

        <button 
          onClick={() => onSelectMode(ToolMode.SPLIT)}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-24 h-24 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V4A2,2 0 0,1 7,2M7,4V20H17V4H7M9,6H15V8H9V6M9,10H15V12H9V10Z"/></svg>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dividir PDF</h2>
          <p className="text-gray-600">Extraia páginas ou separe um PDF em vários documentos menores.</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
