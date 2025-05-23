import { IsNotEmpty, Length } from 'class-validator'

export default class CreateProductDTO {
    @IsNotEmpty()
    @Length(3, 255)
    name: string;

    @IsNotEmpty()
    @Length(3, 255)
    description: string;

    @IsNotEmpty()
    weight: number;
}