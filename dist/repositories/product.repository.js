"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const connection_1 = __importDefault(require("@/database/connection"));
const product_entity_1 = require("@/entities/product.entity");
class ProductRepository {
    constructor() {
        this.repository = connection_1.default.getRepository(product_entity_1.Product);
    }
    async getAll() {
        return await this.repository.find();
    }
}
exports.ProductRepository = ProductRepository;
