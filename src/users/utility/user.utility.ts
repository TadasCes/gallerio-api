import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { response } from 'express';
import mongoose, { Model, Types } from 'mongoose';
import { User } from '../user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserUtility {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getUserId(name: string): Promise<string> {
    const user = await this.userModel.findOne(
      { name: name },
      (err: Error) => {
        if (err) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: err.message,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      },
    );
    if (user === null) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user._id.toString();
  }
}
