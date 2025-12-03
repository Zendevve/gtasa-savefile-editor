import type { SaveData } from '../types/SaveData';
import { SaveFileWriter } from '../parser/SaveFileWriter';

export const exportSaveFile = (saveData: SaveData): void => {
  if (!saveData.rawBuffer) {
    throw new Error('No save file buffer available');
  }

  try {
    // Create writer and export modified buffer
    const writer = new SaveFileWriter(saveData.rawBuffer);
    const modifiedBuffer = writer.export(saveData);

    // Create blob and download
    const blob = new Blob([modifiedBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = saveData.fileName || 'GTASAsf_modified.b';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};
