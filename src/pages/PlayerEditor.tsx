import React, { useState } from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Heart, Shield, DollarSign, Download, Activity, User, Trophy } from 'lucide-react';
import { SaveFileWriter } from '../lib/parser/SaveFileWriter';

export const PlayerEditor: React.FC = () => {
  const { saveData, updatePlayerStat } = useSaveStore();
  const [isExporting, setIsExporting] = useState(false);

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to edit player stats.</p>
        </div>
      </div>
    );
  }

  const { player } = saveData;

  const handleStatChange = (stat: keyof typeof player, value: string) => {
    const numValue = parseInt(value) || 0;
    updatePlayerStat(stat, numValue);
  };

  const handleExport = () => {
    if (!saveData.rawBuffer) {
      alert('No save file buffer available');
      return;
    }

    try {
      setIsExporting(true);
      const writer = new SaveFileWriter(saveData.rawBuffer);
      const modifiedBuffer = writer.export(saveData);
      const blob = new Blob([modifiedBuffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = saveData.fileName || 'GTASAsf_modified.b';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setTimeout(() => setIsExporting(false), 1000);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${(error as Error).message}`);
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Player Stats</h1>
          <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Edit CJ's attributes, skills, and status</p>
        </div>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="brutal-btn flex items-center gap-2 bg-black text-white hover:bg-neutral-800 hover:text-white border-black shadow-[4px_4px_0px_0px_#FFFF00] hover:shadow-[2px_2px_0px_0px_#FFFF00]"
        >
          <Download size={20} />
          {isExporting ? 'EXPORTING...' : 'EXPORT SAVE'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vitals Column (Left) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="brutal-card bg-white text-black border-black shadow-[8px_8px_0px_0px_#000]">
            <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
              <Activity size={28} />
              Vitals
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Health</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-black border-r-4 border-black flex items-center justify-center z-10">
                    <Heart className="text-red-500" size={20} fill="currentColor" />
                  </div>
                  <input
                    type="number"
                    value={Math.round(player.health)}
                    onChange={(e) => handleStatChange('health', e.target.value)}
                    className="w-full bg-white text-black border-4 border-black py-3 pl-16 pr-4 font-mono text-xl font-bold focus:outline-none focus:bg-brutal-yellow transition-colors"
                  />
                </div>
                <div className="mt-2 h-4 border-2 border-black bg-neutral-200 relative">
                  <div className="h-full bg-red-600 absolute top-0 left-0" style={{ width: `${(player.health / player.maxHealth) * 100}%` }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Armor</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-black border-r-4 border-black flex items-center justify-center z-10">
                    <Shield className="text-blue-500" size={20} fill="currentColor" />
                  </div>
                  <input
                    type="number"
                    value={Math.round(player.armor)}
                    onChange={(e) => handleStatChange('armor', e.target.value)}
                    className="w-full bg-white text-black border-4 border-black py-3 pl-16 pr-4 font-mono text-xl font-bold focus:outline-none focus:bg-brutal-yellow transition-colors"
                  />
                </div>
                <div className="mt-2 h-4 border-2 border-black bg-neutral-200 relative">
                  <div className="h-full bg-blue-600 absolute top-0 left-0" style={{ width: `${Math.min(player.armor, 100)}%` }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono font-bold text-neutral-600 mb-2 uppercase">Money</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-black border-r-4 border-black flex items-center justify-center z-10">
                    <DollarSign className="text-green-500" size={20} />
                  </div>
                  <input
                    type="number"
                    value={player.money}
                    onChange={(e) => handleStatChange('money', e.target.value)}
                    className="w-full bg-white text-black border-4 border-black py-3 pl-16 pr-4 font-mono text-xl font-bold focus:outline-none focus:bg-brutal-yellow transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Column (Right) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="brutal-card">
            <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-2 border-b-4 border-black pb-2">
              <User size={28} />
              Attributes & Skills
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  { label: 'Fat', key: 'fat', max: 1000 },
                  { label: 'Stamina', key: 'stamina', max: 1000 },
                  { label: 'Muscle', key: 'muscle', max: 1000 },
                ].map((stat) => {
                  const value = player[stat.key as keyof typeof player] as number;
                  return (
                    <div key={stat.key}>
                      <div className="flex justify-between text-sm mb-2 font-mono font-bold uppercase">
                        <label>{stat.label}</label>
                        <span>{Math.round(value)} / {stat.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={stat.max}
                        value={value}
                        onChange={(e) => handleStatChange(stat.key as keyof typeof player, e.target.value)}
                        className="w-full h-4 bg-white border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-brutal-yellow [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Respect', key: 'respect', max: 100 },
                  { label: 'Sex Appeal', key: 'sexAppeal', max: 100 },
                  { label: 'Luck', key: 'luck', max: 1000 },
                ].map((stat) => {
                  const value = player[stat.key as keyof typeof player] as number;
                  return (
                    <div key={stat.key}>
                      <div className="flex justify-between text-sm mb-2 font-mono font-bold uppercase">
                        <label>{stat.label}</label>
                        <span>{value} / {stat.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={stat.max}
                        value={value}
                        onChange={(e) => handleStatChange(stat.key as keyof typeof player, e.target.value)}
                        className="w-full h-4 bg-white border-2 border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
