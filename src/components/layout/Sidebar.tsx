import React from 'react';
import { LayoutDashboard, User, Crosshair, Car, Map, Save, Settings, FileUp } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'player', label: 'Player', icon: User },
    { id: 'weapons', label: 'Weapons', icon: Crosshair },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'missions', label: 'Missions', icon: Map },
    { id: 'garages', label: 'Garages', icon: Save },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex-shrink-0 flex flex-col h-screen fixed left-0 top-0 z-10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <Save className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">GTASA Editor</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-2 mt-4">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-primary-600/10 text-primary-500'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                }`}
            >
              <Icon size={18} className={isActive ? 'text-primary-500' : 'text-neutral-500'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-all duration-200">
          <FileUp size={18} />
          Upload New Save
        </button>
      </div>
    </aside>
  );
};
