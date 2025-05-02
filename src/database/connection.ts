import "reflect-metadata";
import { DataSource } from "typeorm";
import fs from "fs";
import dotenv from 'dotenv'
// import { Product } from "../entities/product.entity";
dotenv.config();

// Leitura do certificado CA para SSL
const caCert = fs.readFileSync(".certs/ca-server-postgres.pem").toString()
const dbPort: number = parseInt(process.env.DB_POSTGRES_PORT ?? '0') || 0;

// Configuração do DataSource do TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_POSTGRES_HOST || "", 
  port: dbPort, 
  username: process.env.DB_POSTGRES_USER || "",
  password: process.env.DB_POSTGRES_PASSWORD ||"",
  database: process.env.DB_POSTGRES_DATABASE || "defaultdb", 
  synchronize: true, // Sincroniza automaticamente as entidades com o banco de dados (use com cuidado em produção)
  logging: true, // Habilita logs das consultas SQL
  entities: [__dirname + '/../**/*.entity.ts'],//versao para rodar os migrations => [Product],//[__dirname + "/**/entities/*.entity.ts"], // Caminho para as entidades
  subscribers: [],
  migrations: [__dirname + "/**/migrations/*.ts"], // Caminho para as migrações
  migrationsTableName: "migrations", // Nome da tabela que armazena as migrações
  ssl: {
    rejectUnauthorized: true, // Rejeita conexões não autorizadas
    ca: caCert, // Certificado CA lido do arquivo
  },
});

AppDataSource.initialize()
              .then(() => console.log('connected success'))
              .catch((error) => console.log(error))

// Inicialize a conexão quando for usar, não no módulo
export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
}

// Exporte também o DataSource puro para as migrações
export default AppDataSource;
