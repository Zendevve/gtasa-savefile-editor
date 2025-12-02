export class BinaryWriter {
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

  public writeUint8(value: number): void {
    this.view.setUint8(this.offset, value);
    this.offset += 1;
  }

  public writeUint16(value: number): void {
    this.view.setUint16(this.offset, value, true); // little-endian
    this.offset += 2;
  }

  public writeUint32(value: number): void {
    this.view.setUint32(this.offset, value, true); // little-endian
    this.offset += 4;
  }

  public writeInt32(value: number): void {
    this.view.setInt32(this.offset, value, true); // little-endian
    this.offset += 4;
  }

  public writeFloat(value: number): void {
    this.view.setFloat32(this.offset, value, true); // little-endian
    this.offset += 4;
  }

  public writeString(value: string): void {
    for (let i = 0; i < value.length; i++) {
      this.view.setUint8(this.offset + i, value.charCodeAt(i));
    }
    this.offset += value.length;
  }
}
