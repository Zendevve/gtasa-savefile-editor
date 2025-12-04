import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Clock, MapPin, Settings2, AlertTriangle } from 'lucide-react';

export const General: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to edit general settings.</p>
        </div>
      </div>
    );
  }

  // Story progress options
  const storyStages = [
    { id: 0, label: 'Los Santos', sanFierro: false, lasVenturas: false },
    { id: 1, label: 'San Fierro', sanFierro: true, lasVenturas: false },
    { id: 2, label: 'Las Venturas', sanFierro: true, lasVenturas: true },
    { id: 3, label: 'Back to LS', sanFierro: true, lasVenturas: true },
    { id: 4, label: 'Completed', sanFierro: true, lasVenturas: true },
  ];

  const weatherTypes = [
    { id: 0, label: 'Sunny' },
    { id: 1, label: 'Cloudy' },
    { id: 2, label: 'Rainy' },
    { id: 3, label: 'Foggy' },
    { id: 4, label: 'Thunderstorm' },
    { id: 5, label: 'Sandstorm' },
  ];

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">General</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Game settings and story progress</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Time Settings */}
        <div className="brutal-card rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
            <Clock size={28} />
            Time
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Hour</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  defaultValue={12}
                  className="w-full bg-white text-black border-4 border-black py-2 px-4 font-mono text-lg font-bold focus:outline-none focus:bg-brutal-yellow transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Minute</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  defaultValue={0}
                  className="w-full bg-white text-black border-4 border-black py-2 px-4 font-mono text-lg font-bold focus:outline-none focus:bg-brutal-yellow transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Weather</label>
              <select className="w-full bg-white text-black border-4 border-black py-2 px-4 font-mono font-bold focus:outline-none focus:bg-brutal-yellow cursor-pointer">
                {weatherTypes.map(weather => (
                  <option key={weather.id} value={weather.id}>{weather.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Story Progress */}
        <div className="brutal-card -rotate-1 hover:rotate-0 transition-transform">
          <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
            <MapPin size={28} />
            Story Progress
          </h3>

          <div className="space-y-3">
            {storyStages.map((stage) => (
              <button
                key={stage.id}
                className="w-full flex items-center justify-between px-4 py-3 border-4 border-black font-bold transition-all hover:bg-brutal-yellow bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]"
              >
                <span className="uppercase">{stage.label}</span>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-mono ${stage.sanFierro ? 'bg-green-500 text-white' : 'bg-neutral-300'}`}>
                    SF
                  </span>
                  <span className={`px-2 py-1 text-xs font-mono ${stage.lasVenturas ? 'bg-green-500 text-white' : 'bg-neutral-300'}`}>
                    LV
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Game Flags */}
        <div className="brutal-card">
          <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
            <Settings2 size={28} />
            Game Flags
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Gang Wars', key: 'gangWars' },
              { label: 'Riots in LS', key: 'riots' },
              { label: 'Infinite Run', key: 'infiniteRun' },
              { label: 'Fireproof', key: 'fireProof' },
              { label: 'Fast Reload', key: 'fastReload' },
              { label: 'All Taxis have Nitro', key: 'taxiNitro' },
            ].map((flag) => (
              <label key={flag.key} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-4 border-black appearance-none cursor-pointer checked:bg-brutal-yellow checked:before:content-['✓'] checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:font-bold"
                />
                <span className="font-mono font-bold uppercase group-hover:text-brutal-red transition-colors">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="brutal-card">
          <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
            <AlertTriangle size={28} />
            Statistics
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Times Cheated', key: 'timesCheated', value: 0 },
              { label: 'Times Busted', key: 'timesBusted', value: 0 },
              { label: 'Times Wasted', key: 'timesWasted', value: 0 },
              { label: 'Days Passed', key: 'daysPassed', value: 0 },
            ].map((stat) => (
              <div key={stat.key} className="flex items-center justify-between">
                <span className="font-mono font-bold uppercase">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    defaultValue={stat.value}
                    className="w-24 bg-white text-black border-4 border-black px-2 py-1 font-mono text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                  />
                  <button className="w-8 h-8 bg-black text-white border-2 border-black hover:bg-brutal-red flex items-center justify-center font-bold">
                    0
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
