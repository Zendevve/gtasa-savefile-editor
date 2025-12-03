import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { FileUpload } from '../components/FileUpload';

export const Dashboard: React.FC = () => {
  const { saveData, setSaveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Upload your GTA San Andreas save file (.b) to start editing.</p>

          <FileUpload />

          <div className="mt-6 text-sm text-neutral-400 font-mono">
            <p>Supported: v1.0, v2.0, Steam</p>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-white/20">
            <button
              onClick={() => {
                setSaveData({
                  fileName: 'MOCK_SAVE.b',
                  timestamp: Date.now(),
                  rawBuffer: new ArrayBuffer(0),
                  player: {
                    name: 'CJ',
                    money: 350000,
                    health: 100,
                    maxHealth: 150,
                    armor: 50,
                    stamina: 800,
                    muscle: 500,
                    fat: 100,
                    respect: 40,
                    sexAppeal: 30,
                    luck: 10
                  },
                  weapons: [],
                  garages: [],
                  progress: {
                    missionsCompleted: 15,
                    totalMissions: 100,
                    tagsSpray: 20,
                    snapshots: 5,
                    horseshoes: 0,
                    oysters: 2,
                    territoriesOwned: 5,
                    territoriesTotal: 50,
                    uniqueJumps: 3
                  }
                });
              }}
              className="text-brutal-yellow hover:text-white font-mono text-sm underline uppercase"
            >
              [Dev] Load Mock Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Dashboard</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Overview of your progress in San Andreas</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Stat Cards */}
        <div className="brutal-card rotate-1 hover:rotate-0 transition-transform duration-200">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-2">Money</h3>
          <p className="text-xl md:text-2xl font-black text-green-600 break-all">${saveData.player.money.toLocaleString()}</p>
        </div>

        <div className="brutal-card -rotate-1 hover:rotate-0 transition-transform duration-200">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-2">Health</h3>
          <div className="mt-2 h-6 border-2 border-black bg-white relative">
            <div
              className="h-full bg-red-600 absolute top-0 left-0"
              style={{ width: `${(saveData.player.health / saveData.player.maxHealth) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs font-mono font-bold mt-1">{Math.round(saveData.player.health)} / {Math.round(saveData.player.maxHealth)}</p>
        </div>

        <div className="brutal-card rotate-1 hover:rotate-0 transition-transform duration-200">
          <h3 className="text-black font-mono text-sm font-bold uppercase border-b-2 border-black pb-1 mb-2">Missions</h3>
          <div className="mt-2 h-6 border-2 border-black bg-white relative">
            <div
              className="h-full bg-blue-600 absolute top-0 left-0"
              style={{ width: `${(saveData.progress.missionsCompleted / saveData.progress.totalMissions) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs font-mono font-bold mt-1">{saveData.progress.missionsCompleted} / {saveData.progress.totalMissions}</p>
        </div>
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            setSaveData({
              fileName: 'MOCK_SAVE.b',
              timestamp: Date.now(),
              rawBuffer: new ArrayBuffer(0),
              player: {
                name: 'CJ',
                money: 350000,
                health: 100,
                maxHealth: 150,
                armor: 50,
                stamina: 800,
                muscle: 500,
                fat: 100,
                respect: 40,
                sexAppeal: 30,
                luck: 10
              },
              weapons: [],
              garages: [],
              progress: {
                missionsCompleted: 15,
                totalMissions: 100,
                tagsSpray: 20,
                snapshots: 5,
                horseshoes: 0,
                oysters: 2,
                territoriesOwned: 5,
                territoriesTotal: 50,
                uniqueJumps: 3
              }
            });
          }}
          className="font-mono text-sm underline hover:bg-black hover:text-white px-2 py-1 transition-colors"
        >
          [Dev] Load Mock Data
        </button>
      </div>
    </div>
  );
};
