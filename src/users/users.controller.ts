import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './model/user.dto';
import { UsersService } from './users.service';
import { FriendsService } from './friends.service';
import { User } from './user.interface';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UpdatePasswordDto } from './model/updatePassword.dto'
import { ConfigService } from 'nestjs-dotenv';

@Catch(HttpException)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private friendsService: FriendsService,
    private readonly configService: ConfigService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':name')
  async getOneUser(@Param('name') name: string): Promise<User> {
    return this.userService.getOneUser(name);
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':name/update-password')
  async updateUserPassword(
    @Param('name') name: string,
    @Body() passwordDto: UpdatePasswordDto
  ) {
    return this.userService.updateUserPassword(name, passwordDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':name')
  async deleteUser(@Param('name') name: string) {
    return this.userService.deleteUser(name);
  }

  @UseGuards(LocalAuthGuard)
  @Get(':name/friends')
  async getUserFriendList(@Param('name') name: string) {
    return this.friendsService.getUserFriendList(name).catch(err => {
      throw new Error(err);
    });
  }

  @UseGuards(LocalAuthGuard)
  @Put(':name/friends/add-friend')
  async addFriendToList(
    @Param('name') name: string,
    @Body('friend') friend: string,
  ) {
    return this.friendsService.addFriendToList(name, friend);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':name/friends/remove-friend')
  async removeFriendFromList(
    @Param('name') name: string,
    @Body('friend') friend: string,
  ) {
    return this.friendsService.removeFriendFromList(name, friend);
  }
}
