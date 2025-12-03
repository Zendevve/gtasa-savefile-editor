import type { Weapon } from '../types/SaveData';

// GTA San Andreas weapon database
// Based on weapon IDs and slots from the game

export interface WeaponDefinition {
  id: number;
  name: string;
  slot: number;
  modelId: number;
  defaultAmmo: number;
}

export const WEAPON_DATABASE: WeaponDefinition[] = [
  // Slot 0 - Unarmed
  { id: 0, name: 'Unarmed', slot: 0, modelId: 0, defaultAmmo: 1 },

  // Slot 1 - Melee
  { id: 1, name: 'Brass Knuckles', slot: 1, modelId: 331, defaultAmmo: 1 },
  { id: 2, name: 'Golf Club', slot: 1, modelId: 333, defaultAmmo: 1 },
  { id: 3, name: 'Nightstick', slot: 1, modelId: 334, defaultAmmo: 1 },
  { id: 4, name: 'Knife', slot: 1, modelId: 335, defaultAmmo: 1 },
  { id: 5, name: 'Baseball Bat', slot: 1, modelId: 336, defaultAmmo: 1 },
  { id: 6, name: 'Shovel', slot: 1, modelId: 337, defaultAmmo: 1 },
  { id: 7, name: 'Pool Cue', slot: 1, modelId: 338, defaultAmmo: 1 },
  { id: 8, name: 'Katana', slot: 1, modelId: 339, defaultAmmo: 1 },
  { id: 9, name: 'Chainsaw', slot: 1, modelId: 341, defaultAmmo: 1 },

  // Slot 2 - Handguns
  { id: 22, name: '9mm Pistol', slot: 2, modelId: 346, defaultAmmo: 200 },
  { id: 23, name: 'Silenced 9mm', slot: 2, modelId: 347, defaultAmmo: 200 },
  { id: 24, name: 'Desert Eagle', slot: 2, modelId: 348, defaultAmmo: 200 },

  // Slot 3 - Shotguns
  { id: 25, name: 'Shotgun', slot: 3, modelId: 349, defaultAmmo: 100 },
  { id: 26, name: 'Sawnoff Shotgun', slot: 3, modelId: 350, defaultAmmo: 100 },
  { id: 27, name: 'Combat Shotgun', slot: 3, modelId: 351, defaultAmmo: 100 },

  // Slot 4 - SMGs
  { id: 28, name: 'Micro SMG', slot: 4, modelId: 352, defaultAmmo: 500 },
  { id: 29, name: 'MP5', slot: 4, modelId: 353, defaultAmmo: 500 },
  { id: 32, name: 'Tec-9', slot: 4, modelId: 372, defaultAmmo: 500 },

  // Slot 5 - Assault Rifles
  { id: 30, name: 'AK-47', slot: 5, modelId: 355, defaultAmmo: 300 },
  { id: 31, name: 'M4', slot: 5, modelId: 356, defaultAmmo: 300 },

  // Slot 6 - Rifles
  { id: 33, name: 'Country Rifle', slot: 6, modelId: 357, defaultAmmo: 200 },
  { id: 34, name: 'Sniper Rifle', slot: 6, modelId: 358, defaultAmmo: 100 },

  // Slot 7 - Heavy Weapons
  { id: 35, name: 'RPG', slot: 7, modelId: 359, defaultAmmo: 50 },
  { id: 36, name: 'Heat-Seeking RPG', slot: 7, modelId: 360, defaultAmmo: 50 },
  { id: 37, name: 'Flamethrower', slot: 7, modelId: 361, defaultAmmo: 500 },
  { id: 38, name: 'Minigun', slot: 7, modelId: 362, defaultAmmo: 5000 },

  // Slot 8 - Thrown
  { id: 16, name: 'Grenade', slot: 8, modelId: 342, defaultAmmo: 50 },
  { id: 17, name: 'Tear Gas', slot: 8, modelId: 343, defaultAmmo: 50 },
  { id: 18, name: 'Molotov Cocktail', slot: 8, modelId: 344, defaultAmmo: 50 },
  { id: 39, name: 'Satchel Charge', slot: 8, modelId: 363, defaultAmmo: 50 },

  // Slot 9 - Special
  { id: 41, name: 'Spray Can', slot: 9, modelId: 365, defaultAmmo: 500 },
  { id: 42, name: 'Fire Extinguisher', slot: 9, modelId: 366, defaultAmmo: 500 },
  { id: 43, name: 'Camera', slot: 9, modelId: 367, defaultAmmo: 100 },

  // Slot 10 - Gifts
  { id: 10, name: 'Purple Dildo', slot: 10, modelId: 321, defaultAmmo: 1 },
  { id: 11, name: 'Dildo', slot: 10, modelId: 322, defaultAmmo: 1 },
  { id: 12, name: 'Vibrator', slot: 10, modelId: 323, defaultAmmo: 1 },
  { id: 14, name: 'Flowers', slot: 10, modelId: 325, defaultAmmo: 1 },
  { id: 15, name: 'Cane', slot: 10, modelId: 326, defaultAmmo: 1 },

  // Slot 11 - Special Items
  { id: 44, name: 'Night Vision Goggles', slot: 11, modelId: 368, defaultAmmo: 1 },
  { id: 45, name: 'Thermal Goggles', slot: 11, modelId: 369, defaultAmmo: 1 },
  { id: 46, name: 'Parachute', slot: 11, modelId: 371, defaultAmmo: 1 },
];

export function getWeaponById(id: number): WeaponDefinition | undefined {
  return WEAPON_DATABASE.find(w => w.id === id);
}

export function getWeaponsBySlot(slot: number): WeaponDefinition[] {
  return WEAPON_DATABASE.filter(w => w.slot === slot);
}

export function createWeapon(definition: WeaponDefinition, ammo?: number): Weapon {
  return {
    id: definition.id,
    name: definition.name,
    slot: definition.slot,
    modelId: definition.modelId,
    ammo: ammo ?? definition.defaultAmmo,
  };
}
