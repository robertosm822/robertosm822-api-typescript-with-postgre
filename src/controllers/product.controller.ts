import { Request, Response, NextFunction } from "express";
import { Product } from "@/entities/product.entity";
import AppDataSource from "@/database/connection";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { ProductRepository } from "@/repositories/product.repository";

class ProductController {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }
  findAll = async (request: Request,response: Response ): Promise<Response> => {
    
    const products = await this.productRepository.getAll();

    return response.status(200).send({
      data: products,
    });
  }

  async findOne(request: Request, response: Response): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product);
    const id: string = request.params.id;
    const product = await productRepository.findOneBy({ id });

    if (!product) {
      response.status(404).send({
        error: "Product not found",
      });
    } else {
      response.status(200).send({
        data: product,
      });
    }
  }

  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    const productRepository = AppDataSource.getRepository(Product);

    const { name, description, weight } = request.body;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.weight = weight;

    const errors = await validate(product);
    if (errors.length > 0) {
      return response.status(422).send({
        errors,
      });
    }

    const prodDB = await productRepository.save(product);

    return response.status(201).send({
      data: prodDB,
    });
  }

  async update(request: Request, response: Response): Promise<any> {
    const productRepository = AppDataSource.getRepository(Product);

    const { name, description, weight } = request.body;
    const id: string = request.params.id;

    let product: Product | any;

    try {
      product = await productRepository.findOneByOrFail({ id });
    } catch (error) {
      return response.status(404).send({
        error: "Product not found",
      });
    }

    product.name = name;
    product.description = description;
    product.weight = weight;
    const errors = await validate(product);
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
    } catch (error) {
      return response.status(500).send({
        error: "Internal Error " + error,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product);
    const id: string = request.params.id;

    try {
      await productRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      response.status(500).send({
        error: "Internal Error " + error,
      });
    }
  }
}

export default new ProductController();
