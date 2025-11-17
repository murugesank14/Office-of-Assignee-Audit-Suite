
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AuditParagraphGenerator from './components/AuditParagraphGenerator';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          <div className="container mx-auto max-w-5xl">
            <AuditParagraphGenerator />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
