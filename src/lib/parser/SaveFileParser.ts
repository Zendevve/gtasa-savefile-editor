import { BinaryReader } from './BinaryReader';
import type { SaveData, PlayerStats, GameProgress } from '../types/SaveData';

export class SaveFileParser {
  private reader: BinaryReader;
  private buffer: ArrayBuffer;

  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer;
    this.reader = new BinaryReader(buffer);
  }

  public parse(): SaveData {
    // Search for all occurrences of "BLOCK"
    const blockPositions: number[] = [];
    const searchBytes = new Uint8Array(this.buffer);

    for (let i = 0; i < searchBytes.length - 4; i++) {
      if (
        searchBytes[i] === 66 &&      // 'B'
        searchBytes[i + 1] === 76 &&  // 'L'
        searchBytes[i + 2] === 79 &&  // 'O'
        searchBytes[i + 3] === 67 &&  // 'C'
        searchBytes[i + 4] === 75     // 'K'
      ) {
        blockPositions.push(i);
      }
    }

    // Verify we have enough blocks (minimum 28 for some variants)
    if (blockPositions.length < 15) {
      throw new Error(`Invalid save file: Found only ${blockPositions.length} BLOCK tags, expected at least 15`);
    }

    // Verify file starts with "BLOCK"
    if (blockPositions[0] !== 0) {
      throw new Error('Invalid save file: File must start with "BLOCK" tag');
    }

    console.log(`Found ${blockPositions.length} BLOCK tags in file`);
    console.log(`File size: ${this.buffer.byteLength} bytes`);

    let player: PlayerStats = this.createDefaultPlayerStats();
    let progress: GameProgress = this.createDefaultGameProgress();

    // Parse Block 15 (Ped Pool) for player stats
    if (blockPositions.length > 15) {
      try {
        // Block 15 data starts after "BLOCK" (5 bytes) at position blockPositions[15]
        const blockStart = blockPositions[15] + 5;
        const blockEnd = blockPositions.length > 16 ? blockPositions[16] : this.buffer.byteLength;
        const blockSize = blockEnd - blockStart;

        console.log(`Parsing Block 15 (Ped Pool) at offset ${blockStart}, size ${blockSize}`);

        this.reader.seek(blockStart);
        const pedStats = this.parsePedPool(blockSize);
        if (pedStats) {
          player = { ...player, ...pedStats };
        }
      } catch (e) {
        console.error('Failed to parse Ped Pool:', e);
        throw new Error(`Failed to parse player data (Block 15): ${(e as Error).message}`);
      }
    } else {
      console.warn('File does not have Block 15, using default player stats');
    }

    return {
      fileName: 'GTASAsf.b',
      timestamp: Date.now(),
      rawBuffer: this.buffer,
      player,
      weapons: [],
      garages: [],
      progress
    };
  }

  private parsePedPool(blockSize: number): Partial<PlayerStats> | null {
    // Block 15 Structure:
    // [Number of Peds (4 bytes)]
    // [Ped Data Structures...]

    // The first ped is always the player (CJ).
    // Ped structure size depends on version, but for v1.0 it's usually 0x7C4 (1988 bytes).

    // Skip 4 bytes (Count)
    this.reader.skip(4);

    const pedStart = this.reader.getOffset();

    // Check if we have enough data
    if (blockSize < 0x550) {
      console.warn('Block 15 too small for player data');
      return null;
    }

    // Health: Offset 0x540 (float)
    // Max Health: Offset 0x544 (float)
    // Armor: Offset 0x548 (float)

    this.reader.seek(pedStart + 0x540);
    const health = this.reader.readFloat();
    const maxHealth = this.reader.readFloat();
    const armor = this.reader.readFloat();

    return {
      health,
      maxHealth,
      armor
    };
  }

  private createDefaultPlayerStats(): PlayerStats {
    return {
      name: 'CJ',
      money: 0,
      health: 100,
      maxHealth: 100,
      armor: 0,
      stamina: 0,
      muscle: 0,
      fat: 0,
      respect: 0,
      sexAppeal: 0,
      luck: 0
    };
  }

  private createDefaultGameProgress(): GameProgress {
    return {
      missionsCompleted: 0,
      totalMissions: 100,
      tagsSpray: 0,
      snapshots: 0,
      horseshoes: 0,
      oysters: 0,
      territoriesOwned: 0,
      territoriesTotal: 57,
      uniqueJumps: 0
    };
  }
}
