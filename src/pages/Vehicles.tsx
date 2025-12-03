import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Car } from 'lucide-react';

export const Vehicles: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to view vehicles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Vehicles</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">View your collection</p>
      </header>

      <div className="brutal-card">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
            <Car size={32} className="text-brutal-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">Vehicle Status</h2>
            <p className="font-mono text-sm">Tracking San Andreas rides</p>
          </div>
        </div>

        <div className="text-center py-12 bg-neutral-100 border-4 border-dashed border-black">
          <Car size={48} className="mx-auto mb-4 text-neutral-400" />
          <p className="font-mono font-bold uppercase mb-2">Vehicle data coming soon</p>
          <p className="font-mono text-sm text-neutral-600">Parser implementation in progress</p>
        </div>
      </div>
    </div>
  );
};
