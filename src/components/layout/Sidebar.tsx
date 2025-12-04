import React, { useState } from 'react';
import { LayoutDashboard, User, Crosshair, Car, Map, Save, Settings, FileUp, Download, Sliders, Wrench } from 'lucide-react';
import { useSaveStore } from '../../store/useSaveStore';
import { exportSaveFile } from '../../lib/utils/exportSave';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { saveData, isDirty } = useSaveStore();
  const [isExporting, setIsExporting] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'general', label: 'General', icon: Sliders },
    { id: 'player', label: 'Player', icon: User },
    { id: 'weapons', label: 'Weapons', icon: Crosshair },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'missions', label: 'Missions', icon: Map },
    { id: 'garages', label: 'Garages', icon: Save },
    { id: 'fixes', label: 'Fixes', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleExport = async () => {
    if (!saveData) return;

    try {
      setIsExporting(true);
      exportSaveFile(saveData);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      alert(`Export failed: ${(error as Error).message}`);
      setIsExporting(false);
    }
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-8 h-fit z-10">
      <div className="bg-brutal-yellow border-4 border-black p-4 shadow-[8px_8px_0px_0px_#000] -rotate-1 transform transition-transform hover:rotate-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <Save className="w-6 h-6 text-brutal-yellow" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">GTASA Editor</h1>
        </div>
      </div>

      <nav className="flex flex-col gap-3">
        <div className="bg-black text-white px-2 py-1 font-mono text-sm uppercase inline-block w-fit rotate-2 mb-2">
          // Navigation
        </div>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-bold transition-all duration-100 ${rotation} hover:rotate-0 hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${isActive
                ? 'bg-black text-brutal-yellow shadow-[4px_4px_0px_0px_#FFFF00]'
                : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:bg-brutal-yellow'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-brutal-yellow' : 'text-black'} />
              <span className="uppercase tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {saveData && (
        <div className="mt-auto space-y-3">
          {isDirty && (
            <div className="bg-brutal-yellow border-4 border-black p-2 text-center font-mono text-xs font-bold uppercase animate-pulse">
              ⚠ MODIFIED
            </div>
          )}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-brutal-red text-white border-4 border-black font-bold shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase"
          >
            <Download size={20} />
            {isExporting ? 'EXPORTING...' : 'EXPORT SAVE'}
          </button>
        </div>
      )}

      {!saveData && (
        <div className="mt-auto">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-brutal-red text-white border-4 border-black font-bold shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all uppercase">
            <FileUp size={20} />
            Upload Save
          </button>
        </div>
      )}
    </aside>
  );
};
