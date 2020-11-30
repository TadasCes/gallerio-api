import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpService,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './model/interfaces/IUser';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UpdatePasswordDto } from './model/dto/updatePassword.dto';
import { ConfigService } from 'nestjs-dotenv';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RegisterDto } from './model/dto/register.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './pictures.service';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { async } from 'rxjs';
import { existsSync } from 'fs';
import { mkdirSync } from 'fs';
import { readFile } from 'fs';
import { createWriteStream } from 'fs';
import { createReadStream } from 'fs';
import { UserDto } from './model/dto/user.dto';

// TODO Iskelt sita i atskira faila
const multerOptions = {
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `./uploads/${req.headers.user}`;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
        cb(null, uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Generates random 32 symbol name
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
  fileFilter: function(req, file, cb) {
    let ext = file.mimetype;
    if (ext !== 'image/png' && ext !== 'image/jpg' && ext !== 'image/jpeg') {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  },
};

// TODO isskirt nuotraukas ir draugus i atskirus failus
// TODO visur pakeist, kad naudotu email, o ne username
@Catch(HttpException)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private pictureService: PictureService,
    private readonly configService: ConfigService,
  ) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':name')
  async getOneUser(@Param('name') name: string): Promise<User> {
    return this.userService.getOneUser(name);
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Post('/register')
  async registerNewUser(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.registerNewUser(registerDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':name/update-password')
  async updateUserPassword(
    @Param('name') name: string,
    @Body() passwordDto: UpdatePasswordDto,
  ) {
    return this.userService.updateUserPassword(name, passwordDto);
  }

  // //@UseGuards(JwtAuthGuard)
  // @Put(':name')
  // async updateUser(@Param('name') name: string, @Body() userDto: UserDto) {
  //   return this.userService.updateUser(name, userDto);
  // }

  //@UseGuards(JwtAuthGuard)
  @Delete(':name')
  async deleteUser(@Param('name') name: string) {
    return this.userService.deleteUser(name);
  }

  // //@UseGuards(JwtAuthGuard)
  // @Post(':name/add-pictures')
  // @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  // async uploadPictures(
  //   @Param('name') name: string,
  //   @UploadedFiles() files: Express.Multer.File[],
  // ) {
  //   return this.pictureService.uploadPictures(name, files);
  // }

  // //@UseGuards(JwtAuthGuard)
  // @Get(':name/pictures')
  // async getPictures(@Param('name') name: string) {
  //   return this.pictureService.getPictures(name);
  // }

  // //@UseGuards(JwtAuthGuard)
  // @Get(':name/pictures/download')
  // async downloadPicture(@Res() res, @Req() req) {
  //   res.sendFile(req.headers.url);
  // }

  // //@UseGuards(JwtAuthGuard)
  // @Put(':name/pictures/:picture')
  // async updatePicture(
  //   @Param('name') name: string,
  //   @Param('picture') picture: string,
  //   @Body('description') description: string,
  // ) {
  //   return this.pictureService.updatePicture(name, picture, description);
  // }

  // //@UseGuards(JwtAuthGuard)
  // @Delete(':name/pictures/:picture')
  // async deletePicture(
  //   @Param('name') name: string,
  //   @Param('picture') picture: string,
  // ) {
  //   return this.pictureService.deletePicture(name, picture);
  // }
}
