import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class MovieDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    director: string;
    
}