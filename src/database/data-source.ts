import { DataSource } from "typeorm";
import { config } from "dotenv";
import path from "path";
import fs from "fs";

config();

const caCert = fs.readFileSync(".certs/ca-server-postgres.pem").toString();
const dbPort = parseInt(process.env.DB_POSTGRES_PORT || "5432");

// Use export default para ES Modules
export default new DataSource({
  type: "postgres",
  host: process.env.DB_POSTGRES_HOST,
  port: dbPort,
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_DATABASE,
  entities: [path.join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "../migrations/*{.ts,.js}")],
  ssl: {
    rejectUnauthorized: true,
    ca: caCert,
  },
});