import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Plus, Minus } from 'lucide-react';

export const Missions: React.FC = () => {
  const { saveData, updateProgress } = useSaveStore();

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

  const handleIncrement = (field: keyof typeof progress, max: number) => {
    const current = progress[field] as number;
    if (current < max) {
      updateProgress(field, current + 1);
    }
  };

  const handleDecrement = (field: keyof typeof progress) => {
    const current = progress[field] as number;
    if (current > 0) {
      updateProgress(field, current - 1);
    }
  };

  const handleChange = (field: keyof typeof progress, value: string) => {
    const num = parseInt(value) || 0;
    updateProgress(field, num);
  };

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Missions</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Track your progress</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Missions */}
        <div className="brutal-card rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Main Missions</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="font-mono font-bold text-sm">Completed:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement('missionsCompleted')}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={progress.missionsCompleted}
                  onChange={(e) => handleChange('missionsCompleted', e.target.value)}
                  className="w-20 bg-white text-black border-4 border-black px-2 py-1 font-mono text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                />
                <span className="font-mono font-bold">/ {progress.totalMissions}</span>
                <button
                  onClick={() => handleIncrement('missionsCompleted', progress.totalMissions)}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-brutal-yellow absolute top-0 left-0 border-r-4 border-black transition-all"
                style={{ width: `${(progress.missionsCompleted / progress.totalMissions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Collectibles */}
        <div className="brutal-card -rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Collectibles</h3>
          <div className="space-y-3 font-mono text-sm">
            {[
              { label: 'Tags Sprayed', field: 'tagsSpray' as const, max: 100 },
              { label: 'Snapshots', field: 'snapshots' as const, max: 50 },
              { label: 'Horseshoes', field: 'horseshoes' as const, max: 50 },
              { label: 'Oysters', field: 'oysters' as const, max: 50 },
            ].map((item) => (
              <div key={item.field} className="flex items-center justify-between gap-2">
                <span>{item.label}:</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDecrement(item.field)}
                    className="w-6 h-6 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                  >
                    <Minus size={12} />
                  </button>
                  <input
                    type="number"
                    value={progress[item.field]}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    className="w-16 bg-white text-black border-2 border-black px-1 text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                  />
                  <span className="font-black">/{item.max}</span>
                  <button
                    onClick={() => handleIncrement(item.field, item.max)}
                    className="w-6 h-6 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Territory */}
        <div className="brutal-card hover:rotate-1 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Territory</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="font-mono font-bold text-sm">Owned:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement('territoriesOwned')}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={progress.territoriesOwned}
                  onChange={(e) => handleChange('territoriesOwned', e.target.value)}
                  className="w-20 bg-white text-black border-4 border-black px-2 py-1 font-mono text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                />
                <span className="font-mono font-bold">/ {progress.territoriesTotal}</span>
                <button
                  onClick={() => handleIncrement('territoriesOwned', progress.territoriesTotal)}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-brutal-red absolute top-0 left-0 border-r-4 border-black transition-all"
                style={{ width: `${(progress.territoriesOwned / progress.territoriesTotal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Unique Jumps */}
        <div className="brutal-card hover:-rotate-1 transition-transform">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-4">Unique Jumps</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="font-mono font-bold text-sm">Completed:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement('uniqueJumps')}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={progress.uniqueJumps}
                  onChange={(e) => handleChange('uniqueJumps', e.target.value)}
                  className="w-20 bg-white text-black border-4 border-black px-2 py-1 font-mono text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                />
                <span className="font-mono font-bold">/ 70</span>
                <button
                  onClick={() => handleIncrement('uniqueJumps', 70)}
                  className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-neutral-800 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="h-6 border-4 border-black bg-white relative mt-4">
              <div
                className="h-full bg-black absolute top-0 left-0 border-r-4 border-black transition-all"
                style={{ width: `${(progress.uniqueJumps / 70) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
