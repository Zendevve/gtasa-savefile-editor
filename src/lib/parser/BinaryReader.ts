export class BinaryReader {
  private view: DataView;
  private offset: number = 0;
  private size: number;

  constructor(buffer: ArrayBuffer) {
    this.view = new DataView(buffer);
    this.size = buffer.byteLength;
  }

  private checkBounds(bytes: number): void {
    if (this.offset + bytes > this.size) {
      throw new Error(`Buffer overrun: Attempted to read ${bytes} bytes at offset ${this.offset}, but buffer size is ${this.size}`);
    }
  }

  public seek(offset: number): void {
    if (offset < 0 || offset > this.size) {
      throw new Error(`Invalid seek: Attempted to seek to ${offset}, but buffer size is ${this.size}`);
    }
    this.offset = offset;
  }

  public skip(bytes: number): void {
    this.checkBounds(bytes);
    this.offset += bytes;
  }

  public getOffset(): number {
    return this.offset;
  }

  public readUint8(): number {
    this.checkBounds(1);
    const value = this.view.getUint8(this.offset);
    this.offset += 1;
    return value;
  }

  public readUint16(): number {
    this.checkBounds(2);
    const value = this.view.getUint16(this.offset, true); // Little endian
    this.offset += 2;
    return value;
  }

  public readUint32(): number {
    this.checkBounds(4);
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readInt32(): number {
    this.checkBounds(4);
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readFloat(): number {
    this.checkBounds(4);
    const value = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readString(length: number): string {
    this.checkBounds(length);
    let str = '';
    for (let i = 0; i < length; i++) {
      const charCode = this.view.getUint8(this.offset + i);
      if (charCode === 0) break;
      str += String.fromCharCode(charCode);
    }
    this.offset += length;
    return str;
  }

  public readBool(bytes: number = 1): boolean {
    const value = this.readUint8();
    if (bytes > 1) this.skip(bytes - 1);
    return value !== 0;
  }
}
