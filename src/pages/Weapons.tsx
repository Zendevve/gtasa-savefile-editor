import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Crosshair } from 'lucide-react';

export const Weapons: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to view weapons.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Weapons</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Manage CJ's arsenal</p>
      </header>

      <div className="brutal-card">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
            <Crosshair size={32} className="text-brutal-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">Weapons Inventory</h2>
            <p className="font-mono text-sm">Total weapons: {saveData.weapons?.length || 0}</p>
          </div>
        </div>

        {saveData.weapons && saveData.weapons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {saveData.weapons.map((weapon, index) => (
              <div key={index} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000]">
                <h3 className="font-black text-lg uppercase mb-1">{weapon.name || `Weapon ${index + 1}`}</h3>
                <p className="font-mono text-sm">Ammo: {weapon.ammo || 0}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-100 border-4 border-dashed border-black">
            <Crosshair size={48} className="mx-auto mb-4 text-neutral-400" />
            <p className="font-mono font-bold uppercase">No weapons data available</p>
          </div>
        )}
      </div>
    </div>
  );
};
