import React from 'react';
import { Sun, Settings, Timer, X } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-sm font-medium bg-red-100 text-red-600 rounded">Recording</span>
          <Timer className="w-4 h-4" />
          <span className="text-sm text-gray-600">00:28</span>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-gray-600" />
          <Settings className="w-5 h-5 text-gray-600" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-1.5 bg-red-600 text-white rounded-md flex items-center space-x-1">
          <X className="w-4 h-4" />
          <span>Leave</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Auto Scroll</span>
          <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}