export class ApiError extends Error {
  public statusCode: number;
  /**
  * Creates an instance of ApiError
  * @param {string} errorMessage - The error message
  * @param {number} httpStatusCode - The HTTP status code
  */
  constructor(errorMessage: string, httpStatusCode: number) {
    super(errorMessage);
    this.statusCode = httpStatusCode;
  }
}
