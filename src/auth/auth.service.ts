import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { ILogin } from 'src/users/model/ILogin';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneUser(username);
    if (user && user.password === md5(pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInfo: ILogin) {
    const user = await this.usersService.getOneUser(loginInfo.username);
    const payload = { username: loginInfo.username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
