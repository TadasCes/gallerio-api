import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as md5 from 'md5';

@Injectable()
export class PasswordUtility {
  static passwordValidation(password1: string, password2: string): void {
    let errorMessage = '';
    if (password1.length < 8) {
      errorMessage += 'Password must be longer than 8 symbols. ';
    } else if (password1.length > 50) {
      errorMessage += 'Password must be shorter than 50 symbols. ';
    } else {
      if (password1.search(/(?=.*\d)/)) {
        errorMessage += 'Password must have at least one digit. ';
      }
      if (password1.search(/(?=.*[a-z])/)) {
        errorMessage += 'Password must have at least one lower case letter. ';
      }
      if (password1.search(/(?=.*[A-Z])/)) {
        errorMessage += 'Password must have at least one upper case letter. ';
      }
      if (password1 !== password2) {
        errorMessage += 'Passwords must match. ';
      }
    }
    if (errorMessage !== '') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: errorMessage.trim(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  static encryptPassword(password: string): string {
    const newPassword = md5(password);
    return newPassword;
  }
}
