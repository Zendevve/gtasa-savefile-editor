import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Settings</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Configure the editor</p>
      </header>

      <div className="brutal-card">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
            <SettingsIcon size={32} className="text-brutal-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">Editor Preferences</h2>
            <p className="font-mono text-sm">Customize your experience</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black text-lg uppercase mb-4">About</h3>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="font-bold">Version:</span> 1.0.0</p>
              <p><span className="font-bold">Save Format:</span> GTA San Andreas (.b)</p>
              <p><span className="font-bold">Supported Versions:</span> v1.0, v2.0, Steam</p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black text-lg uppercase mb-4">Backup & Safety</h3>
            <div className="space-y-4">
              <div className="bg-brutal-yellow border-2 border-black p-4">
                <p className="font-mono text-sm font-bold">⚠ ALWAYS BACKUP YOUR SAVE FILES</p>
              </div>
              <p className="font-mono text-sm">
                This editor modifies binary save files. While we've tested extensively,
                always keep a backup of your original save file before making changes.
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
            <h3 className="font-black text-lg uppercase mb-4">Theme</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brutal-yellow border-4 border-black"></div>
              <div className="w-12 h-12 bg-brutal-red border-4 border-black"></div>
              <div className="w-12 h-12 bg-black border-4 border-black"></div>
              <div className="w-12 h-12 bg-white border-4 border-black"></div>
              <span className="font-mono text-sm font-bold ml-4">BRUTALIST CHAOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
