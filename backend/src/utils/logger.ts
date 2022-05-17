import pino from "pino";

const streams = [
  { stream: process.stdout },
  { stream: pino.destination("pino.log") },
];

const logger = pino(
  {
    level: process.env.LOG_LEVEL || "warn",
  },
  pino.multistream(streams),
);

export default logger;
