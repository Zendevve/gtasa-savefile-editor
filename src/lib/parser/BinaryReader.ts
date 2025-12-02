export class BinaryReader {
  private view: DataView;
  private offset: number = 0;

  constructor(buffer: ArrayBuffer) {
    this.view = new DataView(buffer);
  }

  public seek(offset: number): void {
    this.offset = offset;
  }

  public skip(bytes: number): void {
    this.offset += bytes;
  }

  public getOffset(): number {
    return this.offset;
  }

  public readUint8(): number {
    const value = this.view.getUint8(this.offset);
    this.offset += 1;
    return value;
  }

  public readUint16(): number {
    const value = this.view.getUint16(this.offset, true); // Little endian
    this.offset += 2;
    return value;
  }

  public readUint32(): number {
    const value = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readInt32(): number {
    const value = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readFloat(): number {
    const value = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }

  public readString(length: number): string {
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
