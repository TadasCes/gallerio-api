import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
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
}
