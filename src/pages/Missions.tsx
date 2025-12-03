import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Map } from 'lucide-react';

export const Missions: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to view missions.</p>
        </div>
      </div>
    );
  }

  const progress = saveData.progress;

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Missions</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Track your progress</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="brutal-card rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Main Missions</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold">Completed:</span>
              <span className="text-2xl font-black">{progress.missionsCompleted}/{progress.totalMissions}</span>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-brutal-yellow absolute top-0 left-0 border-r-4 border-black"
                style={{ width: `${(progress.missionsCompleted / progress.totalMissions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="brutal-card -rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Collectibles</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span>Tags Sprayed:</span>
              <span className="font-black">{progress.tagsSpray}/100</span>
            </div>
            <div className="flex justify-between">
              <span>Snapshots:</span>
              <span className="font-black">{progress.snapshots}/50</span>
            </div>
            <div className="flex justify-between">
              <span>Horseshoes:</span>
              <span className="font-black">{progress.horseshoes}/50</span>
            </div>
            <div className="flex justify-between">
              <span>Oysters:</span>
              <span className="font-black">{progress.oysters}/50</span>
            </div>
          </div>
        </div>

        <div className="brutal-card hover:rotate-1 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Territory</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold">Owned:</span>
              <span className="text-2xl font-black">{progress.territoriesOwned}/{progress.territoriesTotal}</span>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-brutal-red absolute top-0 left-0 border-r-4 border-black"
                style={{ width: `${(progress.territoriesOwned / progress.territoriesTotal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="brutal-card hover:-rotate-1 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Unique Jumps</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center font-mono">
              <span className="font-bold">Completed:</span>
              <span className="text-2xl font-black">{progress.uniqueJumps}/70</span>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-black absolute top-0 left-0 border-r-4 border-black"
                style={{ width: `${(progress.uniqueJumps / 70) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
