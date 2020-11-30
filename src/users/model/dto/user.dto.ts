import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEmail, IsNotEmpty, IsOptional, MATCHES, MaxLength, MinLength } from "class-validator"
import { IGallery } from "../interfaces/IGallery";
import { IPicture } from "../interfaces/IPicture";

// FIXME sutvarkyt normaliai visus validatorius
export class UserDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(30)
    @ApiProperty()
    password: string;

    @ApiProperty()
    username: string;

    @IsOptional()
    @ApiProperty()
    firstName: string;

    @IsOptional()
    @ApiProperty()
    lastName: string;

    @IsOptional()
    @ApiProperty()
    age: number;

    @IsOptional()
    @ApiProperty()
    bio: string;

    @IsOptional()
    @ApiProperty()
    website: string;

    @ApiProperty()
    galleries: Array<IGallery>;

}
