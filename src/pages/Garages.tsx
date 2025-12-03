import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Save } from 'lucide-react';

export const Garages: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to view garages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Garages</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Manage stored vehicles</p>
      </header>

      <div className="brutal-card">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
            <Save size={32} className="text-brutal-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">Garage Storage</h2>
            <p className="font-mono text-sm">Total garages: {saveData.garages?.length || 0}</p>
          </div>
        </div>

        {saveData.garages && saveData.garages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {saveData.garages.map((garage, index) => (
              <div key={index} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
                <h3 className="font-black text-xl uppercase mb-2">Garage {index + 1}</h3>
                <p className="font-mono text-sm mb-4">{garage.location || 'Unknown Location'}</p>
                <div className="border-t-2 border-black pt-2">
                  <p className="font-mono text-xs">Vehicles: {garage.vehicles?.length || 0}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-100 border-4 border-dashed border-black">
            <Save size={48} className="mx-auto mb-4 text-neutral-400" />
            <p className="font-mono font-bold uppercase mb-2">No garage data available</p>
            <p className="font-mono text-sm text-neutral-600">Parser implementation in progress</p>
          </div>
        )}
      </div>
    </div>
  );
};
