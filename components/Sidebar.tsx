import React from 'react';
import { FileTextIcon } from './icons/FileTextIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { FolderIcon } from './icons/FolderIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { SettingsIcon } from './icons/SettingsIcon';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', icon: <DashboardIcon />, active: false },
    { name: 'Estate Files', icon: <FolderIcon />, active: false },
    { name: 'Registers', icon: <BookOpenIcon />, active: false },
    { name: 'Audit Planning', icon: <CalendarIcon />, active: false },
    { name: 'AI Assistant', icon: <LightbulbIcon />, active: true },
    { name: 'Reports', icon: <FileTextIcon />, active: false },
    { name: 'Settings', icon: <SettingsIcon />, active: false },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-lg font-bold text-indigo-600">AAS</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
              item.active
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
