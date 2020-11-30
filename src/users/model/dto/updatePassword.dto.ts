import { ApiProperty } from '@nestjs/swagger';
import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MATCHES,
  MaxLength,
  MinLength,
} from 'class-validator';

// FIXME nepamenu sito. Sutvarkyt password validator
export class UpdatePasswordDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(3, {
    each: true,
    message: 'Tag is too short. Minimal length is $value characters',
  })
  @MaxLength(50, {
    each: true,
    message: 'Tag is too long. Maximal length is $value characters',
  })
  @Matches(/(?=.*\d)/)
  password1: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(3, {
    each: true,
    message: 'Tag is too short. Minimal length is $value characters',
  })
  @MaxLength(50, {
    each: true,
    message: 'Tag is too long. Maximal length is $value characters',
  })
  @Matches(/(?=.*\d)/)
  password2: string;
}
