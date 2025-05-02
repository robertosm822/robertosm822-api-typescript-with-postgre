"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
exports.initializeDatabase = initializeDatabase;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { Product } from "../entities/product.entity";
dotenv_1.default.config();
// Leitura do certificado CA para SSL
const caCert = fs_1.default.readFileSync(".certs/ca-server-postgres.pem").toString();
const dbPort = parseInt(process.env.DB_POSTGRES_PORT ?? '0') || 0;
// Configuração do DataSource do TypeORM
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_POSTGRES_HOST || "",
    port: dbPort,
    username: process.env.DB_POSTGRES_USER || "",
    password: process.env.DB_POSTGRES_PASSWORD || "",
    database: process.env.DB_POSTGRES_DATABASE || "defaultdb",
    synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (use com cuidado em produção)
    logging: true, // Habilita logs das consultas SQL
    entities: [__dirname + '/../**/*.entity.ts'], //versao para rodar os migrations => [Product],//[__dirname + "/**/entities/*.entity.ts"], // Caminho para as entidades
    subscribers: [],
    migrations: [__dirname + "/**/migrations/*.ts"], // Caminho para as migrações
    migrationsTableName: "migrations", // Nome da tabela que armazena as migrações
    ssl: {
        rejectUnauthorized: true, // Rejeita conexões não autorizadas
        ca: caCert, // Certificado CA lido do arquivo
    },
});
exports.AppDataSource.initialize()
    .then(() => console.log('connected success'))
    .catch((error) => console.log(error));
// Inicialize a conexão quando for usar, não no módulo
async function initializeDatabase() {
    try {
        await exports.AppDataSource.initialize();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
    }
    catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        throw error;
    }
}
// Exporte também o DataSource puro para as migrações
exports.default = exports.AppDataSource;
