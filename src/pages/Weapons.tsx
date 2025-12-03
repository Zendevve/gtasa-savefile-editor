import React, { useState } from 'react';
import { useSaveStore } from '../store/useSaveStore';
import { Crosshair, Plus, Trash2, X } from 'lucide-react';
import { WEAPON_DATABASE, createWeapon, type WeaponDefinition } from '../lib/data/weapons';

export const Weapons: React.FC = () => {
  const { saveData, addWeapon, removeWeapon, updateWeapon } = useSaveStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  if (!saveData) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="brutal-card max-w-md w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#FFFF00] p-8">
          <h2 className="text-3xl font-black text-brutal-yellow mb-2 uppercase tracking-tighter transform -rotate-1">NO SAVE LOADED</h2>
          <p className="text-white font-mono mb-6 text-sm">Please upload a save file on the Dashboard to view weapons.</p>
        </div>
      </div>
    );
  }

  const handleAddWeapon = (weaponDef: WeaponDefinition) => {
    const weapon = createWeapon(weaponDef);
    addWeapon(weapon);
    setShowAddModal(false);
    setSelectedSlot(null);
  };

  // Group weapons by slot
  const weaponSlots: { [key: number]: WeaponDefinition[] } = {};
  WEAPON_DATABASE.forEach(weapon => {
    if (!weaponSlots[weapon.slot]) {
      weaponSlots[weapon.slot] = [];
    }
    weaponSlots[weapon.slot].push(weapon);
  });

  const slotNames: { [key: number]: string } = {
    0: 'Unarmed',
    1: 'Melee',
    2: 'Handguns',
    3: 'Shotguns',
    4: 'SMGs',
    5: 'Assault Rifles',
    6: 'Rifles',
    7: 'Heavy Weapons',
    8: 'Thrown',
    9: 'Special',
    10: 'Gifts',
    11: 'Special Items',
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-4">
        <div>
          <h1 className="text-5xl font-black text-black uppercase tracking-tighter">Weapons</h1>
          <p className="text-black font-mono mt-2 bg-brutal-yellow inline-block px-2 transform -rotate-1">Manage CJ's arsenal</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="brutal-btn flex items-center gap-2 bg-brutal-red text-white border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000]"
        >
          <Plus size={20} />
          ADD WEAPON
        </button>
      </header>

      {
        saveData.weapons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saveData.weapons.map((weapon, index) => (
              <div key={index} className="brutal-card hover:rotate-1 transition-transform">
                <div className="flex items-center justify-between mb-4 border-b-4 border-black pb-2">
                  <h3 className="font-black text-lg uppercase tracking-tight">{weapon.name}</h3>
                  <button
                    onClick={() => removeWeapon(index)}
                    className="w-8 h-8 bg-brutal-red text-white border-2 border-black hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="font-bold">Slot:</span>
                    <span className="bg-black text-white px-2 py-1">{weapon.slot}</span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-sm">
                    <span className="font-bold">Ammo:</span>
                    <input
                      type="number"
                      value={weapon.ammo}
                      onChange={(e) => updateWeapon(index, { ammo: parseInt(e.target.value) || 0 })}
                      className="w-24 bg-white text-black border-2 border-black px-2 py-1 text-center font-bold focus:outline-none focus:bg-brutal-yellow"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="brutal-card text-center py-12">
            <Crosshair size={64} className="mx-auto mb-4 text-neutral-400" />
            <h3 className="font-mono font-bold uppercase mb-2 text-xl">NO WEAPONS</h3>
            <p className="font-mono text-sm text-neutral-600 mb-6">Get started by adding some weapons</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="brutal-btn inline-flex items-center gap-2"
            >
              <Plus size={20} />
              ADD YOUR FIRST WEAPON
            </button>
          </div>
        )
      }

      {/* Add Weapon Modal */}
      {
        showAddModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-8 border-black max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-[16px_16px_0px_0px_#000]">
              <div className="bg-brutal-yellow border-b-4 border-black p-4 flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase">ADD WEAPON</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedSlot(null);
                  }}
                  className="w-10 h-10 bg-black text-white hover:bg-neutral-800 flex items-center justify-center"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                {selectedSlot === null ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(weaponSlots).map((slotKey) => {
                      const slot = parseInt(slotKey);
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className="brutal-card hover:rotate-1 hover:bg-brutal-yellow transition-all text-left p-4"
                        >
                          <div className="font-black text-sm uppercase mb-1">Slot {slot}</div>
                          <div className="font-mono text-xs">{slotNames[slot]}</div>
                          <div className="font-mono text-xs text-neutral-600 mt-2">{weaponSlots[slot].length} weapons</div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="mb-4 font-mono text-sm underline hover:text-neutral-600"
                    >
                      ← Back to slots
                    </button>
                    <h3 className="font-black text-xl uppercase mb-4 border-b-2 border-black pb-2">
                      {slotNames[selectedSlot]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {weaponSlots[selectedSlot].map((weaponDef) => (
                        <button
                          key={weaponDef.id}
                          onClick={() => handleAddWeapon(weaponDef)}
                          className="brutal-card hover:bg-brutal-yellow transition-colors text-left p-4"
                        >
                          <div className="font-black uppercase mb-2">{weaponDef.name}</div>
                          <div className="font-mono text-xs space-y-1">
                            <div>ID: {weaponDef.id}</div>
                            <div>Default Ammo: {weaponDef.defaultAmmo}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
