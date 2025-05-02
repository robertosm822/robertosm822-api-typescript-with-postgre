import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
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


