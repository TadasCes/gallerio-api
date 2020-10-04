import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { response } from 'express';
import mongoose, { Model, Types } from 'mongoose';
import { User } from './user.interface';
import { UserDto } from './model/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordUtility } from './utility/password.utility';
import { UserUtility } from './utility/user.utility';
import { UpdatePasswordDto } from './model/updatePassword.dto'
import { ConfigService } from 'nestjs-dotenv';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService
  ) {}

  // kai dedu i constructor meta sita error: 

  // Error: Nest can't resolve dependencies of the UsersService (UserModel, ?).
  // Please make sure that the argument Object at index [1] 
  // is available in the UsersModule context.


  private userUtility = new UserUtility(this.userModel);

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({}).catch(err => {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async getOneUser(@Param('name') name: string): Promise<User> {
    return this.userModel
      .findOne({ _id: await this.userUtility.getUserId(name) })
      .catch(err => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async createUser(userDto: UserDto): Promise<User> {
    PasswordUtility.passwordValidation(userDto.password, userDto.password);
    const encryptedPassword = PasswordUtility.encryptPassword(userDto.password);
    userDto.password = encryptedPassword;
    return await this.userModel.create(userDto).catch(err => {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async updateUserPassword(name: string, passwordDto: UpdatePasswordDto) {
    PasswordUtility.passwordValidation(passwordDto.password1, passwordDto.password2);
    return this.userModel
      .findOneAndUpdate(
        { _id: await this.userUtility.getUserId(name) },
        { password: passwordDto.password1 },
      )
      .then(() => {
        return {
          status: 200,
          message: "User's password updated",
        };
      })
      .catch(err => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async deleteUser(name: string) {
    return this.userModel
      .findOneAndDelete({ _id: await this.userUtility.getUserId(name) })
      .then(() => {
        return {
          status: 200,
          message: 'User deleted',
        };
      })
      .catch(err => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
