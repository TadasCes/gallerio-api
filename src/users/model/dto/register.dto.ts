import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

// FIXME sutvarkyt validators
// TODO iskelt visus DTO i atskira folderi
// READ iskelt visus DTO i atskira folderi
export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(3)
  username: string;

  @IsOptional()
  @MinLength(8)
  @ApiProperty()
  password: string;


}
