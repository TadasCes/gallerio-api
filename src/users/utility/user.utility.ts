import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { response } from 'express';
import mongoose, { Model, Types } from 'mongoose';
import { User } from '../model/interfaces/IUser';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserUtility {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUserIdFromEmail(email: string): Promise<string> {
    return this.userModel
      .findOne({ email: email })
      .then(user => {
        return user._id;
      })
      .catch(error => {
        if (error.HttpStatus == 404) {
          throw new HttpException(
            {
              status: HttpStatus.NOT_FOUND,
              error: 'User not found',
            },
            HttpStatus.NOT_FOUND,
          );
        } else {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: error.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
  }
}
