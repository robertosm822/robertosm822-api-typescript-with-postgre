import { Request, Response, NextFunction } from "express";
import { Product } from "../entities/product.entity";
import AppDataSource from "../database/connection";
import { validate } from "class-validator";
import { ProductRepository } from "../repositories/product.repository";
import CreateProductDTO from "../dto/create.product.dto";
import { UpdateProductDTO } from "../dto/update.product.dto";

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

  findOne = async (request: Request, response: Response): Promise<void> => {

    const id: string = request.params.id;

    const product = await this.productRepository.find(id);

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

  create = async ( request: Request,response: Response ): Promise<any> => {
    const productRepository = AppDataSource.getRepository(Product);

    const { name, description, weight } = request.body;

    const dtoProduct = new CreateProductDTO();
    dtoProduct.name = name;
    dtoProduct.description = description;
    dtoProduct.weight = weight;

    const errors = await validate(dtoProduct);
    if (errors.length > 0) {
      return response.status(422).send({
        errors,
      });
    }

    await this.productRepository.create(dtoProduct);

    return response.status(201).send({
      data: dtoProduct,
    });
  }

  update = async(request: Request, response: Response): Promise<Response> => {
    const id: string = request.params.id
    const {name, description, weight} = request.body

    const updateDto = new UpdateProductDTO
    updateDto.id = id
    updateDto.name = name
    updateDto.description = description
    updateDto.weight = weight

    const errors = await validate(updateDto)
    if (errors.length > 0) {
      return response.status(422).send({
        errors
      })
    }

    try {
      const productDb = await this.productRepository.update(updateDto)
      if (!productDb) {
        return response.status(404).send({
          error: 'Product Not Found'
        })
      }
      return response.status(200).send({
        data: productDb
      })
    } catch (error) {
      return response.status(500).send({
        error: 'Internal error'
      })
    }
  }

  delete = async (request: Request, response: Response): Promise<void> => {
    
    const id: string = request.params.id;

    try {
      await this.productRepository.delete(id);
      response.status(204).send();
    } catch (error) {
      response.status(500).send({
        error: "Internal Error " + error,
      });
    }
  }
}

export default new ProductController();
