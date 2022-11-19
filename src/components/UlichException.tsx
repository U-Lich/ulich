export class UlichException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UlichException";
  }
}

export class InvalidHeaderException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "InvalidHeaderException";
    this.message = `Invalid header(s) ${which}: ${message}`;
  }
}

export class InvalidDateTypeException extends UlichException {
  constructor(message: string, which: string) {
    super(message);
    this.name = "InvalidDateTypeException";
    this.message = `Invalid date type ${which}: ${message}`;
  }
}
