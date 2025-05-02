"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_entity_1 = require("@/entities/product.entity");
const connection_1 = __importDefault(require("@/database/connection"));
const class_validator_1 = require("class-validator");
const product_repository_1 = require("@/repositories/product.repository");
const create_product_dto_1 = __importDefault(require("@/dto/create.product.dto"));
class ProductController {
    constructor() {
        this.findAll = async (request, response) => {
            const products = await this.productRepository.getAll();
            return response.status(200).send({
                data: products,
            });
        };
        this.create = async (request, response) => {
            const productRepository = connection_1.default.getRepository(product_entity_1.Product);
            const { name, description, weight } = request.body;
            const dtoProduct = new create_product_dto_1.default();
            dtoProduct.name = name;
            dtoProduct.description = description;
            dtoProduct.weight = weight;
            const errors = await (0, class_validator_1.validate)(dtoProduct);
            if (errors.length > 0) {
                return response.status(422).send({
                    errors,
                });
            }
            await this.productRepository.create(dtoProduct);
            return response.status(201).send({
                data: dtoProduct,
            });
        };
        this.productRepository = new product_repository_1.ProductRepository();
    }
    async findOne(request, response) {
        const id = request.params.id;
        const product = await this.productRepository.find(id);
        if (!product) {
            response.status(404).send({
                error: "Product not found",
            });
        }
        else {
            response.status(200).send({
                data: product,
            });
        }
    }
    async update(request, response) {
        const productRepository = connection_1.default.getRepository(product_entity_1.Product);
        const { name, description, weight } = request.body;
        const id = request.params.id;
        let product;
        try {
            product = await productRepository.findOneByOrFail({ id });
        }
        catch (error) {
            return response.status(404).send({
                error: "Product not found",
            });
        }
        product.name = name;
        product.description = description;
        product.weight = weight;
        const errors = await (0, class_validator_1.validate)(product);
        if (errors.length > 0) {
            return response.status(422).send({
                errors,
            });
        }
        try {
            await productRepository.save(product);
            return response.status(200).send({
                data: "Produto atualizado com sucesso!",
            });
        }
        catch (error) {
            return response.status(500).send({
                error: "Internal Error " + error,
            });
        }
    }
    async delete(request, response) {
        const productRepository = connection_1.default.getRepository(product_entity_1.Product);
        const id = request.params.id;
        try {
            await productRepository.delete(id);
            response.status(204).send();
        }
        catch (error) {
            response.status(500).send({
                error: "Internal Error " + error,
            });
        }
    }
}
exports.default = new ProductController();
