export interface PlayerStats {
  name: string;
  money: number;
  health: number;
  maxHealth: number;
  armor: number;
  stamina: number;
  muscle: number;
  fat: number;
  respect: number;
  sexAppeal: number;
  luck: number;
}

export interface Weapon {
  id: number;
  name: string;
  ammo: number;
  slot: number;
  modelId: number;
}

export interface Vehicle {
  id: number;
  modelId: number;
  name: string;
  color1: number;
  color2: number;
  health: number;
  location: string; // garage name/id
  mods: number[];
}

export interface Garage {
  id: number;
  name: string;
  vehicles: Vehicle[];
}

export interface GameProgress {
  missionsCompleted: number;
  totalMissions: number;
  tagsSpray: number; // out of 100
  snapshots: number; // out of 50
  horseshoes: number; // out of 50
  oysters: number; // out of 50
  territoriesOwned: number;
  territoriesTotal: number;
  uniqueJumps: number; // out of 70
}

export interface SaveData {
  fileName: string;
  timestamp: number;
  player: PlayerStats;
  weapons: Weapon[];
  garages: Garage[];
  progress: GameProgress;
  rawBuffer: ArrayBuffer; // Keep original buffer for saving
}
