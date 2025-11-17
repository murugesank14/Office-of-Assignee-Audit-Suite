
import React from 'react';
import AuditGuide from './AuditGuide';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-800">Assignee Audit Suite</h1>
            <AuditGuide />
          </div>
          {/* Placeholder for user profile */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="hidden md:block text-sm font-medium">Auditor</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
