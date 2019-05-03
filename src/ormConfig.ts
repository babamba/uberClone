import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const connectOptions: ConnectionOptions = {
  type: "mysql",
  database: "nuber",
  port: 3306,
  host: process.env.DB_ENDPOINT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"]
};

export default connectOptions;
