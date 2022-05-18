import dotenv from "dotenv";

dotenv.config();

const config = {
  secret: process.env.SECRET || "secret",
  port: process.env.PORT || "9000",
};

export default config;
