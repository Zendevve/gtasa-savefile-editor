import { create } from 'zustand';
import type { SaveData, Weapon, GameProgress } from '../lib/types/SaveData';

interface SaveStore {
  saveData: SaveData | null;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSaveData: (data: SaveData) => void;
  updatePlayerStat: (stat: keyof SaveData['player'], value: number | string) => void;

  // Weapons actions
  addWeapon: (weapon: Weapon) => void;
  removeWeapon: (index: number) => void;
  updateWeapon: (index: number, weapon: Partial<Weapon>) => void;

  // Progress actions
  updateProgress: (field: keyof GameProgress, value: number) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useSaveStore = create<SaveStore>((set) => ({
  saveData: null,
  isDirty: false,
  isLoading: false,
  error: null,

  setSaveData: (data) => set({ saveData: data, isDirty: false, error: null }),

  updatePlayerStat: (stat, value) => set((state) => {
    if (!state.saveData) return state;

    return {
      saveData: {
        ...state.saveData,
        player: {
          ...state.saveData.player,
          [stat]: value
        }
      },
      isDirty: true
    };
  }),

  addWeapon: (weapon) => set((state) => {
    if (!state.saveData) return state;

    return {
      saveData: {
        ...state.saveData,
        weapons: [...state.saveData.weapons, weapon]
      },
      isDirty: true
    };
  }),

  removeWeapon: (index) => set((state) => {
    if (!state.saveData) return state;

    return {
      saveData: {
        ...state.saveData,
        weapons: state.saveData.weapons.filter((_, i) => i !== index)
      },
      isDirty: true
    };
  }),

  updateWeapon: (index, weaponUpdate) => set((state) => {
    if (!state.saveData) return state;

    return {
      saveData: {
        ...state.saveData,
        weapons: state.saveData.weapons.map((weapon, i) =>
          i === index ? { ...weapon, ...weaponUpdate } : weapon
        )
      },
      isDirty: true
    };
  }),

  updateProgress: (field, value) => set((state) => {
    if (!state.saveData) return state;

    return {
      saveData: {
        ...state.saveData,
        progress: {
          ...state.saveData.progress,
          [field]: value
        }
      },
      isDirty: true
    };
  }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ saveData: null, isDirty: false, error: null, isLoading: false })
}));
