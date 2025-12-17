
import React, { useState, useEffect } from 'react';
import { splitPDF, downloadFile, getPDFMetadata } from '../services/pdfService';

interface PDFSplitterProps {
  onBack: () => void;
}

const PDFSplitter: React.FC<PDFSplitterProps> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<'custom' | 'all'>('custom');
  const [range, setRange] = useState<string>('1-1');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      getPDFMetadata(selectedFile).then(meta => {
        setPageCount(meta.pageCount);
        if (mode === 'custom') setRange(`1-${meta.pageCount}`);
      });
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSplit = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    
    let finalRange = range;
    if (mode === 'all') {
      finalRange = Array.from({ length: pageCount }, (_, i) => (i + 1).toString()).join(',');
    }

    try {
      const pdfs = await splitPDF(selectedFile, finalRange);
      pdfs.forEach((data, idx) => {
        const name = mode === 'all' 
          ? `${selectedFile.name.replace('.pdf', '')}_página_${idx + 1}.pdf`
          : `extração_${idx + 1}.pdf`;
        downloadFile(data, name);
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao dividir o PDF. Verifique se o documento não possui senha.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dividir PDF</h2>
          <p className="text-gray-500">Escolha como deseja separar suas páginas.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          &larr; Voltar
        </button>
      </div>

      {!selectedFile ? (
        <div className="mb-8">
          <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-12 text-center cursor-pointer hover:border-red-400 transition-colors bg-gray-50 hover:bg-red-50/30 group">
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13"/></svg>
              </div>
              <p className="text-lg font-bold text-gray-700">Clique para selecionar o PDF</p>
              <p className="text-sm text-gray-500 mt-1">Seus arquivos permanecem privados no seu computador.</p>
            </div>
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold">
                  PDF
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-800 truncate max-w-[200px] md:max-w-xs">{selectedFile.name}</p>
                 <p className="text-xs text-gray-500 font-medium">{pageCount} páginas • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
               </div>
            </div>
            <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-red-600 p-2 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setMode('custom')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${mode === 'custom' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <span className={`block font-bold ${mode === 'custom' ? 'text-red-600' : 'text-gray-700'}`}>Extração Manual</span>
              <span className="text-xs text-gray-500">Defina intervalos específicos</span>
            </button>
            <button 
              onClick={() => setMode('all')}
              className={`p-4 rounded-xl border-2 transition-all text-left ${mode === 'all' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <span className={`block font-bold ${mode === 'all' ? 'text-red-600' : 'text-gray-700'}`}>Separar Tudo</span>
              <span className="text-xs text-gray-500">Um PDF para cada página</span>
            </button>
          </div>

          {mode === 'custom' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-bold text-gray-700">Quais páginas deseja extrair?</label>
              <input 
                type="text" 
                value={range}
                onChange={(e) => setRange(e.target.value)}
                placeholder={`Ex: 1-2, 5, 7-${pageCount}`}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all font-medium"
              />
              <div className="flex gap-2 text-[11px] text-gray-400 italic">
                <span>Dica: Use "-" para intervalos e "," para páginas avulsas.</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
            <div className="text-sm text-blue-800">
              <p className="font-bold">Resumo da ação:</p>
              <p>{mode === 'all' 
                ? `Serão gerados ${pageCount} arquivos individuais (um por página).` 
                : `Os intervalos definidos serão extraídos em arquivos separados.`}
              </p>
            </div>
          </div>

          <button 
            onClick={handleSplit}
            disabled={(!range && mode === 'custom') || isProcessing}
            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processando localmente...
              </>
            ) : (
              'Processar e Baixar'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFSplitter;
