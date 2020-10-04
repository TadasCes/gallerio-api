import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEmail, IsNotEmpty, IsOptional, MATCHES, MinLength } from "class-validator"

export class UserDto {

    @IsOptional()
    @ApiProperty()
    @MinLength(3)
    name: string;


    @IsOptional()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @IsOptional()
    @ApiProperty()
    @IsEmail()
    email: string;
}
