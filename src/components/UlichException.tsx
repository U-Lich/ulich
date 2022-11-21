export class UlichException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UlichException";
  }
}

export class MissingHeaderException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "MissingHeaderException";
    this.message = `Missing header(s) ${which}: ${message}`;
  }
}
export class InvalidHeaderException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "InvalidHeaderException";
    this.message = `Invalid header(s) ${which}: ${message}`;
  }
}

export class InvalidDataTypeException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "InvalidDataTypeException";
    this.message = `Invalid data type ${which}: ${message}`;
  }
}

export class MissingDataException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "MissingDataException";
    this.message = `Missing data ${which}: ${message}`;
  }
}
