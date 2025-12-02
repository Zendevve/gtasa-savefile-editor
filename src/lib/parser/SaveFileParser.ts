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
    // Basic validation
    if (this.buffer.byteLength < 200000) {
      console.warn('File size seems too small for a GTA SA save file');
    }

    // Reset reader
    this.reader.seek(0);

    let player: PlayerStats = this.createDefaultPlayerStats();
    let progress: GameProgress = this.createDefaultGameProgress();

    // We expect 30 blocks (0 to 29)
    for (let i = 0; i < 30; i++) {
      // Read Block Header
      // "BLOCK" (5 bytes)
      const tag = this.reader.readString(5);
      if (tag !== 'BLOCK') {
        console.warn(`Expected 'BLOCK' at offset ${this.reader.getOffset() - 5}, found '${tag}'`);
      }

      // Read size (4 bytes, uint32)
      const blockSize = this.reader.readUint32();
      const nextBlockOffset = this.reader.getOffset() + blockSize;

      // Parse specific blocks
      if (i === 15) {
        // Block 15: Ped Pool
        console.log(`Parsing Block 15 (Ped Pool) at offset ${this.reader.getOffset()}`);
        try {
          const pedStats = this.parsePedPool(blockSize);
          if (pedStats) {
            player = { ...player, ...pedStats };
          }
        } catch (e) {
          console.error('Failed to parse Ped Pool:', e);
        }
      }

      // Skip to next block
      this.reader.seek(nextBlockOffset);
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
