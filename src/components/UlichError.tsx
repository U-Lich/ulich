export class UlichError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UlichError";
  }
}

export class MissingHeaderError extends UlichError {
  constructor(message: string, headers: string[]) {
    super(message);
    this.name = "MissingHeaderError";
    this.message = `${message}: Không tìm thấy (các) header: ${headers.join(
      ", "
    )}\n`;
  }
}

export class InvalidDataTypeError extends UlichError {
  constructor(message: string, entry: string) {
    super(message);
    this.name = "InvalidDataTypeError";
    this.message = `${message}: Dữ liệu không hợp lệ đã được tìm thấy tại dòng: ${entry}\n`;
  }
}
