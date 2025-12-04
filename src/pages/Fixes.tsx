import React, { useState } from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Wrench, CheckCircle, AlertCircle } from 'lucide-react';

interface GlitchFix {
  id: string;
  name: string;
  description: string;
  isPresent: boolean;
  canFix: boolean;
}

export const Fixes: React.FC = () => {
  const { saveData } = useSaveStore();
  const [fixes, setFixes] = useState<GlitchFix[]>([
    {
      id: 'basketball',
      name: 'Basketball Glitch',
      description: 'No basketball appears on the basketball courts. The cause is saving near an active basketball.',
      isPresent: false,
      canFix: true,
    },
    {
      id: 'poolPlayer',
      name: 'Pool Player Glitch',
      description: 'When saving near an active pool player, the pool player won\'t appear at pool tables anymore.',
      isPresent: false,
      canFix: true,
    },
    {
      id: 'traffic',
      name: 'Traffic Glitch',
      description: 'Cars travel backwards and morph into each other.',
      isPresent: false,
      canFix: true,
    },
    {
      id: 'gym',
      name: 'Gym Glitch',
      description: 'CJ is not allowed to use the gym equipment. The game says "you have worked out enough today" even though you haven\'t exercised.',
      isPresent: false,
      canFix: true,
    },
    {
      id: 'zone',
      name: 'Zone Glitch',
      description: 'Possible effects are that no taxi fares appear anywhere on the map or zone names are invalid.',
      isPresent: false,
      canFix: true,
    },
  ]);

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to check for glitches.</p>
        </div>
      </div>
    );
  }

  const handleFix = (id: string) => {
    setFixes(prev => prev.map(fix =>
      fix.id === id ? { ...fix, isPresent: false, canFix: false } : fix
    ));
  };

  return (
    <div className="space-y-8">
      <header className="border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Fixes</h1>
        <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Repair known glitches in your save</p>
      </header>

      <div className="brutal-card">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <div className="w-16 h-16 bg-black border-4 border-black flex items-center justify-center">
            <Wrench size={32} className="text-brutal-yellow" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase">Glitch Detection</h2>
            <p className="font-mono text-sm">There are some bugs in GTA San Andreas that can cause issues in savegame files.</p>
          </div>
        </div>

        <div className="space-y-4">
          {fixes.map((fix) => (
            <div
              key={fix.id}
              className={`border-4 border-black p-4 transition-all ${fix.isPresent ? 'bg-red-100' : 'bg-green-50'
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {fix.isPresent ? (
                      <AlertCircle className="text-red-600" size={20} />
                    ) : (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                    <h3 className="font-black text-lg uppercase">{fix.name}</h3>
                  </div>
                  <p className="font-mono text-sm text-neutral-600">{fix.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="block text-xs font-mono font-bold uppercase text-neutral-500">Status</span>
                    <span className={`font-bold ${fix.isPresent ? 'text-red-600' : 'text-green-600'}`}>
                      {fix.isPresent ? 'DETECTED' : 'OK'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleFix(fix.id)}
                    disabled={!fix.isPresent || !fix.canFix}
                    className={`px-4 py-2 border-4 border-black font-bold uppercase transition-all ${fix.isPresent && fix.canFix
                        ? 'bg-brutal-red text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      }`}
                  >
                    Fix
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-brutal-yellow border-4 border-black">
          <p className="font-mono text-sm">
            <strong>Note:</strong> Glitch detection requires loading an actual save file. The status shown here is placeholder - actual detection will be based on save file data.
          </p>
        </div>
      </div>
    </div>
  );
};
