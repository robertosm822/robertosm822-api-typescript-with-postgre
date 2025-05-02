"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTable1746046240478 = void 0;
class CreateProductTable1746046240478 {
    constructor() {
        this.name = 'CreateProductTable1746046240478';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "products" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "weight" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "products"`);
    }
}
exports.CreateProductTable1746046240478 = CreateProductTable1746046240478;
