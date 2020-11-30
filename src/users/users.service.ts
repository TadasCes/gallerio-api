import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordUtility } from './utility/password.utility';
import { UserUtility } from './utility/user.utility';
import { UpdatePasswordDto } from './model/dto/updatePassword.dto';
import { RegisterDto } from './model/dto/register.dto';
import { UserDto } from './model/dto/user.dto';
import { User } from './model/interfaces/IUser';
import { EmptyUser } from './model/dto/emptyUser';

//TODO padaryt grazesnius response message
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

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
      .findOne({ _id: await this.userUtility.getUserIdFromEmail(name) })
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

  // FIXME padaryt tvarkingesni tikrinima ar nera jau tokio user
  async registerNewUser(registerDto: RegisterDto): Promise<any> {
    const userForm = new EmptyUser();
    userForm.email = registerDto.email;
    userForm.username = registerDto.username;
    userForm.password = registerDto.password;
    return await this.userModel
      .create(userForm)
      .then(() => {
        return {
          status: 200,
          message: 'User created successfully'
        };
      })
      .catch(err => {
        throw new HttpException(
          {
            code: err.HttpException,
            error: err.message,
          },
          HttpStatus.CONFLICT,
        );
      });
  }

  // FIXME manau yra geresnis update daryt
  // FIXME sudet naujus props
  // async updateUser(searchName: string, userDto: UserDto) {
  //   console.log(searchName);
  //   return this.userModel
  //     .findOne(
  //       { _id: await this.userUtility.getUserIdFromEmail(searchName) },
  //       (err, doc) => {
  //         (doc.firstName = userDto.firstName),
  //           (doc.lastName = userDto.lastName),
  //           (doc.email = userDto.email),
  //           (doc.age = userDto.age),
  //           (doc.website = userDto.website),
  //           doc.save();
  //       },
  //     )
  //     .then(() => {
  //       return {
  //         status: 200,
  //         message: 'User updated',
  //       };
  //     })
  //     .catch(err => {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.INTERNAL_SERVER_ERROR,
  //           error: err.message,
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     });
  // }

  async updateUserPassword(name: string, passwordDto: UpdatePasswordDto) {
    PasswordUtility.passwordValidation(
      passwordDto.password1,
      passwordDto.password2,
    );
    return this.userModel
      .findOneAndUpdate(
        { _id: await this.userUtility.getUserIdFromEmail(name) },
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
      .findOneAndDelete({
        _id: await this.userUtility.getUserIdFromEmail(name),
      })
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
