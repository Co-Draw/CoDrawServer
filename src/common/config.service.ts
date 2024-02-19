import process from "process";
import dotenv from "dotenv";

const env: string = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${env}`,
});

const configService = {
  env,
  port: process.env.SERVER_PORT || 8080,
};

export default configService;
