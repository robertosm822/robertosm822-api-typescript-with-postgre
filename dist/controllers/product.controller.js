"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_entity_1 = require("../entities/product.entity");
const connection_1 = __importDefault(require("../database/connection"));
const class_validator_1 = require("class-validator");
const product_repository_1 = require("../repositories/product.repository");
const create_product_dto_1 = __importDefault(require("../dto/create.product.dto"));
const update_product_dto_1 = require("../dto/update.product.dto");
class ProductController {
    constructor() {
        this.findAll = async (request, response) => {
            const products = await this.productRepository.getAll();
            return response.status(200).send({
                data: products,
            });
        };
        this.findOne = async (request, response) => {
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
        this.update = async (request, response) => {
            const id = request.params.id;
            const { name, description, weight } = request.body;
            const updateDto = new update_product_dto_1.UpdateProductDTO;
            updateDto.id = id;
            updateDto.name = name;
            updateDto.description = description;
            updateDto.weight = weight;
            const errors = await (0, class_validator_1.validate)(updateDto);
            if (errors.length > 0) {
                return response.status(422).send({
                    errors
                });
            }
            try {
                const productDb = await this.productRepository.update(updateDto);
                if (!productDb) {
                    return response.status(404).send({
                        error: 'Product Not Found'
                    });
                }
                return response.status(200).send({
                    data: productDb
                });
            }
            catch (error) {
                return response.status(500).send({
                    error: 'Internal error'
                });
            }
        };
        this.delete = async (request, response) => {
            const id = request.params.id;
            try {
                await this.productRepository.delete(id);
                response.status(204).send();
            }
            catch (error) {
                response.status(500).send({
                    error: "Internal Error " + error,
                });
            }
        };
        this.productRepository = new product_repository_1.ProductRepository();
    }
}
exports.default = new ProductController();
