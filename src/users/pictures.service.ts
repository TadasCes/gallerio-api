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
import { UpdatePasswordDto } from './model/updatePassword.dto';
import { ConfigService } from 'nestjs-dotenv';
import { RegisterDto } from './model/register.dto';
import * as multer from 'multer';
import { domainToASCII, fileURLToPath } from 'url';
import { IPicture } from './model/IPicture';

@Injectable()
export class PictureService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  private userUtility = new UserUtility(this.userModel);

  createPicturesArray(fileInfo: Express.Multer.File[]) {
    const pictures: Array<IPicture> = [];
    fileInfo.forEach(file => {
      pictures.push({
        url: file.path,
        description: '',
      });
    });
    return pictures;
  }

  async uploadPictures(name: string, fileInfo: Express.Multer.File[]) {
    const pictures = this.createPicturesArray(fileInfo);
    return this.userModel
      .findOne({ _id: await this.userUtility.getUserId(name) }, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          doc.pictures = doc.pictures.concat(pictures);
          doc.save();
        }
      })
      .then(data => {
        return {
          status: 200,
          message: 'Pictures added',
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

  async getPictures(name: string) {
    return this.userModel
      .findOne({ _id: await this.userUtility.getUserId(name) })
      .select('pictures')
      .then(doc => {
        for (let index = 0; index < doc.pictures.length; index++) {
          if (doc.pictures[index].url == null) {
            doc.pictures.splice(index, 1);
          }
        }
        doc.save();
        return doc;
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

  async updatePicture(name: string, pictureUrl: string, description: string) {
    return this.userModel
      .findOne({ _id: await this.userUtility.getUserId(name) }, (err, doc) => {
        console.log(doc)
        for (let index = 0; index < doc.pictures.length; index++) {
          if (doc.pictures[index].url.split('\\').slice(-1)[0] === pictureUrl) {
            console.log(doc.pictures[index].description);
            doc.pictures[index].description = description;
            console.log(doc);
            doc.markModified('pictures')
            doc.save();
          }
        }
      })
      .then(() => {
        return {
          status: 200,
          message: 'Picture description updated',
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

  async deletePicture(name: string, pictureUrl: string) {
    return this.userModel
      .findOne({ _id: await this.userUtility.getUserId(name) })
      .select('pictures')
      .then(doc => {
        for (let index = 0; index < doc.pictures.length; index++) {
          if (doc.pictures[index].url != null) {
            if (
              doc.pictures[index].url.split('\\').slice(-1)[0] === pictureUrl
            ) {
              doc.pictures.splice(index, 1);
            }
          } else {
            doc.pictures.splice(index, 1);
          }
        }

        doc.save();
        return {
          status: 200,
          message: 'Picture deleted',
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
