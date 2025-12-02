import { BinaryWriter } from './BinaryWriter';
import type { SaveData } from '../types/SaveData';

export class SaveFileWriter {
  private buffer: ArrayBuffer;
  private writer: BinaryWriter;
  private blockPositions: number[] = [];

  constructor(originalBuffer: ArrayBuffer) {
    // Create a copy of the buffer so we don't modify the original
    this.buffer = originalBuffer.slice(0);
    this.writer = new BinaryWriter(this.buffer);

    // Find all BLOCK positions
    this.findBlockPositions();
  }

  private findBlockPositions(): void {
    const searchBytes = new Uint8Array(this.buffer);

    for (let i = 0; i < searchBytes.length - 4; i++) {
      if (
        searchBytes[i] === 66 &&      // 'B'
        searchBytes[i + 1] === 76 &&  // 'L'
        searchBytes[i + 2] === 79 &&  // 'O'
        searchBytes[i + 3] === 67 &&  // 'C'
        searchBytes[i + 4] === 75     // 'K'
      ) {
        this.blockPositions.push(i);
      }
    }

    console.log(`Found ${this.blockPositions.length} BLOCK tags for writing`);
  }

  public updatePlayerData(saveData: SaveData): void {
    const { player } = saveData;

    // Update Block 15 data
    if (this.blockPositions.length > 15) {
      const blockStart = this.blockPositions[15] + 5;

      // Money at offset 0x4
      this.writer.seek(blockStart + 0x4);
      this.writer.writeInt32(player.money);
      console.log(`Updated money to ${player.money}`);

      // Health, Armor are in ped pool at 0x540, 0x544, 0x548
      // Skip 4 bytes (ped count), then ped data starts
      const pedStart = blockStart + 4;

      this.writer.seek(pedStart + 0x540);
      this.writer.writeFloat(player.health);
      this.writer.writeFloat(player.maxHealth);
      this.writer.writeFloat(player.armor);

      console.log(`Updated health: ${player.health}, armor: ${player.armor}`);
    }

    // Update Block 16 data (player stats)
    if (this.blockPositions.length > 16) {
      const blockStart = this.blockPositions[16] + 5;

      // Fat: 0x54, Stamina: 0x58, Muscle: 0x5C
      this.writer.seek(blockStart + 0x54);
      this.writer.writeFloat(player.fat);
      this.writer.writeFloat(player.stamina);
      this.writer.writeFloat(player.muscle);

      // Respect: 0x100
      this.writer.seek(blockStart + 0x100);
      this.writer.writeFloat(player.respect);

      // Sex Appeal: 0x140
      this.writer.seek(blockStart + 0x140);
      this.writer.writeFloat(player.sexAppeal);

      console.log(`Updated stats: fat=${player.fat}, stamina=${player.stamina}, muscle=${player.muscle}`);
    }
  }

  private calculateChecksum(): number {
    const bytes = new Uint8Array(this.buffer);
    let checksum = 0;

    // Checksum is calculated over all bytes except the last 4 (which is the checksum itself)
    for (let i = 0; i < bytes.length - 4; i++) {
      checksum += bytes[i];
    }

    // Keep only the lower 32 bits
    return checksum & 0xFFFFFFFF;
  }

  private updateChecksum(): void {
    const checksum = this.calculateChecksum();
    const checksumOffset = this.buffer.byteLength - 4;

    this.writer.seek(checksumOffset);
    this.writer.writeUint32(checksum);

    console.log(`Updated checksum to ${checksum} at offset ${checksumOffset}`);
  }

  public export(saveData: SaveData): ArrayBuffer {
    // Update the player data
    this.updatePlayerData(saveData);

    // Recalculate and update checksum
    this.updateChecksum();

    return this.buffer;
  }
}
