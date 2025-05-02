"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)();
const caCert = fs_1.default.readFileSync(".certs/ca-server-postgres.pem").toString();
const dbPort = parseInt(process.env.DB_POSTGRES_PORT || "5432");
// Use export default para ES Modules
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_POSTGRES_HOST,
    port: dbPort,
    username: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    entities: [path_1.default.join(__dirname, "../**/*.entity{.ts,.js}")],
    migrations: [path_1.default.join(__dirname, "../migrations/*{.ts,.js}")],
    ssl: {
        rejectUnauthorized: true,
        ca: caCert,
    },
});
