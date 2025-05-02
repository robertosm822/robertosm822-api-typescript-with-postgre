import { IsNotEmpty, Length } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column()
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @Column()
    @IsNotEmpty()
    @Length(3, 255)
    description: string;
    
    @Column()
    @IsNotEmpty()
    weight: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp'
    })
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}


