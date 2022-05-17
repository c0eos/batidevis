/* eslint-disable max-classes-per-file */
import logger from "./logger";

class AppError extends Error {
  statusCode: number;

  isOperational: boolean;

  constructor(message: string, statusCode = 400, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

class ErrorHandler {
  handle = async (error: AppError | Error, res?: any) => {
    await logger.error(error);
    if (error instanceof AppError && this.isTrustedError(error)) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur interne est survenue" });
    }
  };

  isTrustedError = (error: AppError | Error) => {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  };
}

const handler = new ErrorHandler();

export { handler, AppError };
