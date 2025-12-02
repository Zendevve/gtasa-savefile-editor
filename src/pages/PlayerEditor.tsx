import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Heart, Shield, DollarSign, Activity, Trophy, User } from 'lucide-react';

export const PlayerEditor: React.FC = () => {
  const { saveData, updatePlayerStat } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">No Save File Loaded</h2>
        <p className="text-neutral-400">Please upload a save file on the Dashboard to edit player stats.</p>
      </div>
    );
  }

  const { player } = saveData;

  const handleStatChange = (stat: keyof typeof player, value: string) => {
    const numValue = parseInt(value) || 0;
    updatePlayerStat(stat, numValue);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Player Stats</h1>
        <p className="text-neutral-400">Edit CJ's attributes, skills, and status</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Stats Column */}
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity size={20} className="text-primary-500" />
              Vitals
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Health</label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                  <input
                    type="number"
                    value={Math.round(player.health)}
                    onChange={(e) => handleStatChange('health', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="mt-1 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all" style={{ width: `${(player.health / player.maxHealth) * 100}%` }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Armor</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                  <input
                    type="number"
                    value={Math.round(player.armor)}
                    onChange={(e) => handleStatChange('armor', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <div className="mt-1 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all" style={{ width: `${Math.min(player.armor, 100)}%` }} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1">Money</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" size={16} />
                  <input
                    type="number"
                    value={player.money}
                    onChange={(e) => handleStatChange('money', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Skills Column */}
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <User size={20} className="text-accent-blue" />
              Physical Attributes
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Fat', key: 'fat', max: 1000 },
                { label: 'Stamina', key: 'stamina', max: 1000 },
                { label: 'Muscle', key: 'muscle', max: 1000 },
              ].map((stat) => (
                <div key={stat.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-neutral-400">{stat.label}</label>
                    <span className="text-neutral-500">{player[stat.key as keyof typeof player]} / {stat.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={stat.max}
                    value={player[stat.key as keyof typeof player]}
                    onChange={(e) => handleStatChange(stat.key as keyof typeof player, e.target.value)}
                    className="w-full accent-primary-500 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Skills Column */}
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Trophy size={20} className="text-accent-purple" />
              Status & Skills
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Respect', key: 'respect', max: 100 },
                { label: 'Sex Appeal', key: 'sexAppeal', max: 100 },
                { label: 'Luck', key: 'luck', max: 1000 },
              ].map((stat) => (
                <div key={stat.key}>
                  <div className="flex justify-between text-sm mb-1">
                    <label className="font-medium text-neutral-400">{stat.label}</label>
                    <span className="text-neutral-500">{player[stat.key as keyof typeof player]} / {stat.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={stat.max}
                    value={player[stat.key as keyof typeof player]}
                    onChange={(e) => handleStatChange(stat.key as keyof typeof player, e.target.value)}
                    className="w-full accent-accent-purple h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
