/**
 * Error base compartido entre API y Frontend
 */

export class SharedError extends Error {
  constructor(
    public message: string,
    public code: string = "ERROR",
    public statusCode?: number
  ) {
    super(message);
    Object.setPrototypeOf(this, SharedError.prototype);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
