
import React, { useState } from 'react';
import { mergePDFs, downloadFile } from '../services/pdfService';
import { PDFFile } from '../types';

interface PDFMergerProps {
  onBack: () => void;
}

const PDFMerger: React.FC<PDFMergerProps> = ({ onBack }) => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Explicitly cast to File[] to fix 'unknown' type inference errors and use substring instead of substr
      const fileList = Array.from(e.target.files) as File[];
      const newFiles: PDFFile[] = fileList.map(file => ({
        id: Math.random().toString(36).substring(2, 11),
        file,
        name: file.name,
        size: file.size
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = temp;
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    try {
      const mergedData = await mergePDFs(files.map(f => f.file));
      downloadFile(mergedData, 'unificado.pdf');
    } catch (err) {
      console.error(err);
      alert('Erro ao processar os arquivos. Verifique se são PDFs válidos.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Juntar PDFs</h2>
          <p className="text-gray-500">Combine múltiplos documentos em um só.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          &larr; Voltar
        </button>
      </div>

      <div className="mb-8">
        <label className="block w-full border-2 border-dashed border-gray-200 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-50/30 group">
          <input 
            type="file" 
            multiple 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="hidden" 
          />
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-4 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            <p className="text-lg font-medium text-gray-700">Selecione seus arquivos PDF</p>
            <p className="text-sm text-gray-500 mt-1">ou arraste e solte aqui</p>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Arquivos Selecionados ({files.length})</h3>
          {files.map((file, idx) => (
            <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-xs md:max-w-md">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => moveUp(idx)} disabled={idx === 0} className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg></button>
                <button onClick={() => moveDown(idx)} disabled={idx === files.length - 1} className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg></button>
                <button onClick={() => removeFile(file.id)} className="p-1 text-gray-400 hover:text-red-500 ml-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleMerge}
        disabled={files.length < 2 || isProcessing}
        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Processando...
          </>
        ) : (
          `Juntar ${files.length} PDFs`
        )}
      </button>
    </div>
  );
};

export default PDFMerger;
