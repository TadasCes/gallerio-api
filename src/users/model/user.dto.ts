import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEmail, IsNotEmpty, IsOptional, MATCHES, MinLength } from "class-validator"
import {AddressDto} from "./address.dto"
import { IPicture } from "./IPicture";

export class UserDto {

    @ApiProperty()
    @MinLength(3)
    name: string;

    @ApiProperty()
    @MinLength(3)
    lastName: string;

    @IsOptional()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @IsOptional()
    @ApiProperty()
    age: number;

    @IsOptional()
    @ApiProperty()
    website: string;
    
    @ApiProperty()
    address: AddressDto;

    @ApiProperty()
    pictures: Array<IPicture>;

}
