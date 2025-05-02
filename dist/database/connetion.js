"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Leitura do certificado CA para SSL
const caCert = fs_1.default.readFileSync(".certs/ca-server-postgres.pem").toString();
const dbPort = parseInt(process.env.DB_POSTGRES_PORT ?? '0') || 0;
// Configuração do DataSource do TypeORM
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_POSTGRES_HOST || "",
    port: dbPort,
    username: process.env.DB_POSTGRES_USER || "",
    password: process.env.DB_POSTGRES_PASSWORD || "",
    database: process.env.DB_POSTGRES_DATABASE || "defaultdb",
    synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (use com cuidado em produção)
    logging: true, // Habilita logs das consultas SQL
    entities: [__dirname + "/**/entities/*.entity.ts"], // Caminho para as entidades
    subscribers: [],
    migrations: [__dirname + "/**/migrations/*.ts"], // Caminho para as migrações
    migrationsTableName: "migrations", // Nome da tabela que armazena as migrações
    ssl: {
        rejectUnauthorized: true, // Rejeita conexões não autorizadas
        ca: caCert, // Certificado CA lido do arquivo
    },
});
// Inicialização da conexão com o banco de dados
AppDataSource.initialize()
    .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
})
    .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});
//export default AppDataSource;
module.exports = AppDataSource;
