import { create } from 'zustand';
import type { SaveData } from '../lib/types/SaveData';

interface SaveStore {
  saveData: SaveData | null;
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSaveData: (data: SaveData) => void;
  updatePlayerStat: (stat: keyof SaveData['player'], value: number | string) => void;
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

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ saveData: null, isDirty: false, error: null, isLoading: false })
}));
