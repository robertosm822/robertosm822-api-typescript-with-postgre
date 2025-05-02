import AppDataSource from "@/database/connection";
import CreateProductDTO from "@/dto/create.product.dto";
import { UpdateProductDTO } from "@/dto/update.product.dto";
import { Product } from "@/entities/product.entity";
import { Repository } from "typeorm";

export class ProductRepository {
    private repository: Repository<Product>;

    constructor(){
        this.repository = AppDataSource.getRepository(Product);
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async create(input: CreateProductDTO): Promise<Product> {
        const product = new Product();
        
        product.name = input.name;
        product.description = input.description;
        product.weight = input.weight;

        return this.repository.save(input);
    }

    async find(id: string): Promise<Product | null> {
        return await this.repository.findOneBy({ id });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async update(input: UpdateProductDTO): Promise<Product|null> {
        const product = await this.find(input.id)
        if (!product) {
            return null
        }

        product.name = input.name
        product.description = input.description
        product.weight = input.weight

        return await this.repository.save(product)
    }
}