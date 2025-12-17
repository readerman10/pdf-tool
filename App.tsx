
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Home from './components/Home';
import PDFMerger from './components/PDFMerger';
import PDFSplitter from './components/PDFSplitter';
import { ToolMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<ToolMode>(ToolMode.HOME);

  const renderContent = () => {
    switch (mode) {
      case ToolMode.MERGE:
        return <PDFMerger onBack={() => setMode(ToolMode.HOME)} />;
      case ToolMode.SPLIT:
        return <PDFSplitter onBack={() => setMode(ToolMode.HOME)} />;
      default:
        return <Home onSelectMode={setMode} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGoHome={() => setMode(ToolMode.HOME)} />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {renderContent()}
        {mode === ToolMode.HOME && <FAQ />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
