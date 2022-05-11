const pino = require("pino");

const streams = [
  { stream: process.stdout },
  { stream: pino.destination("pino.log") },
];

module.exports = pino(
  {
    level: process.env.LOG_LEVEL || "warn",
  },
  pino.multistream(streams),
);
