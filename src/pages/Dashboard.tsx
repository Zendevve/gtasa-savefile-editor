import React from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { FileUpload } from '../components/FileUpload';

export const Dashboard: React.FC = () => {
  const { saveData } = useSaveStore();

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700 max-w-md w-full shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-2">No Save File Loaded</h2>
          <p className="text-neutral-400 mb-6">Upload your GTA San Andreas save file (.b) to start editing and viewing analytics.</p>

          <FileUpload />

          <div className="mt-6 text-sm text-neutral-500">
            <p>Supported versions: v1.0, v2.0, Steam</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-neutral-400">Overview of your progress in San Andreas</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards will go here */}
        <div className="card">
          <h3 className="text-neutral-400 text-sm font-medium">Money</h3>
          <p className="text-2xl font-bold text-primary-500 mt-1">${saveData.player.money.toLocaleString()}</p>
        </div>

        <div className="card">
          <h3 className="text-neutral-400 text-sm font-medium">Health</h3>
          <div className="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{ width: `${(saveData.player.health / saveData.player.maxHealth) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs text-neutral-400 mt-1">{Math.round(saveData.player.health)} / {Math.round(saveData.player.maxHealth)}</p>
        </div>

        <div className="card">
          <h3 className="text-neutral-400 text-sm font-medium">Missions</h3>
          <div className="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-blue"
              style={{ width: `${(saveData.progress.missionsCompleted / saveData.progress.totalMissions) * 100}%` }}
            />
          </div>
          <p className="text-right text-xs text-neutral-400 mt-1">{saveData.progress.missionsCompleted} / {saveData.progress.totalMissions}</p>
        </div>
      </div>
    </div>
  );
};
