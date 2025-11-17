
import React, { useState } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';

const AuditGuide: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white shadow-sm rounded-lg hover:bg-gray-100 transition border border-gray-200"
      >
        <BookOpen size={18} className="text-indigo-600" />
        <span className="font-semibold text-sm text-gray-700">Audit Guide</span>
        <ChevronDown size={16} className={`text-gray-500 transform transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div 
          className="absolute mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 origin-top-left"
          onMouseLeave={() => setOpen(false)}
        >
          <h3 className="font-bold text-gray-800 mb-3 text-base">Audit Reference Library</h3>

          <ul className="space-y-1 text-sm text-gray-600">
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Acts</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Rules</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Government Orders (GOs)</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Model Audit Paras</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Model Audit Reports</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Checklist / Check Points</li>
            <li className="hover:bg-gray-100 hover:text-indigo-600 rounded-md p-2 cursor-pointer transition-colors">Organisation Setup</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuditGuide;
