import { CustomError } from './CustomError';

export class TodoServiceError extends CustomError {
  constructor(public statusCode: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, TodoServiceError.prototype);
    this.statusCode = statusCode;
  }
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
