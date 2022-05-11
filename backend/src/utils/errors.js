const logger = require("./logger");

function ErrorHandler() {
  this.handle = async (error, res) => {
    await logger.error(error);
    if (this.isTrustedError(error)) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Une erreur interne est survenue" });
    }
  };

  this.isTrustedError = (error) => error.isOperational;
}

class AppError extends Error {
  constructor(message, statusCode = 400, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

module.exports.handler = new ErrorHandler();
module.exports.AppError = AppError;
