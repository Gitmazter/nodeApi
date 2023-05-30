class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
  
      console.log('AppError', statusCode);
      console.log('Stack', this.stack);
  
      switch (statusCode) {
        case 400:
          this.status = 'Bad Request! Reason: ' + message;
          break;
        case 401:
          this.status = 'Unauthorized! Reason: ' + message;
          break;
        case 404:
          this.status = 'Not found';
          break;
        case 501: 
          this.status = message;
          break;
        case statusCode.startsWith('5'):
          this.status = 'Internal Server Error' + message;
          break;
      }
      this.stackTrace = this.stack;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;