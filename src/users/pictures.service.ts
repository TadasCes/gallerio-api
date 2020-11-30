import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model/interfaces/IUser';
import { InjectModel } from '@nestjs/mongoose';
import { UserUtility } from './utility/user.utility';
import { ConfigService } from 'nestjs-dotenv';
import { IPicture } from './model/interfaces/IPicture';

// TODO padaryt, kad saugotu kaip galerija, i galerija butu galima pridet
// FIXME pakeist irasymus, pridet naujus laukus
@Injectable()
export class PictureService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  private userUtility = new UserUtility(this.userModel);

  // createPicturesArray(fileInfo: Express.Multer.File[]) { 
  //   const pictures: Array<IPicture> = [];
  //   fileInfo.forEach(file => {
  //     pictures.push({
  //       url: file.path,
  //       description: '',
  //     });
  //   });
  //   return pictures;
  // }

  // //FIXME padaryt, kad Mongoose irasytu nuotrauka, o ne TS 
  // async uploadPictures(name: string, fileInfo: Express.Multer.File[]) { 
  // const pictures = this.createPicturesArray(fileInfo);
  //   return this.userModel
  //     .findOne({ _id: await this.userUtility.getUserIdFromEmail(name) }, (err, doc) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         doc.pictures = doc.pictures.concat(pictures);
  //         doc.save();
  //       }
  //     })
  //     .then(data => {
  //       return {
  //         status: 200,
  //         message: 'Pictures added',
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

  // async getPictures(name: string) {
  //   return this.userModel
  //     .findOne({ _id: await this.userUtility.getUserIdFromEmail(name) })
  //     .select('pictures')
  //     .then(doc => {
  //       for (let index = 0; index < doc.pictures.length; index++) {
  //         if (doc.pictures[index].url == null) {
  //           doc.pictures.splice(index, 1);
  //         }
  //       }
  //       doc.save();
  //       return doc;
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

  // async updatePicture(name: string, pictureUrl: string, description: string) { //FIXME padaryt, kad Mongoose irasytu nuotrauka, o ne TS
  //   return this.userModel
  //     .findOne({ _id: await this.userUtility.getUserIdFromEmail(name) }, (err, doc) => {
  //       console.log(doc)
  //       for (let index = 0; index < doc.pictures.length; index++) {
  //         if (doc.pictures[index].url.split('\\').slice(-1)[0] === pictureUrl) {
  //           console.log(doc.pictures[index].description);
  //           doc.pictures[index].description = description;
  //           console.log(doc);
  //           doc.markModified('pictures')
  //           doc.save();
  //         }
  //       }
  //     })
  //     .then(() => {
  //       return {
  //         status: 200,
  //         message: 'Picture description updated',
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

  // async deletePicture(name: string, pictureUrl: string) {
  //   return this.userModel
  //     .findOne({ _id: await this.userUtility.getUserIdFromEmail(name) })
  //     .select('pictures')
  //     .then(doc => {
  //       for (let index = 0; index < doc.pictures.length; index++) {
  //         if (doc.pictures[index].url != null) {
  //           if (
  //             doc.pictures[index].url.split('\\').slice(-1)[0] === pictureUrl
  //           ) {
  //             doc.pictures.splice(index, 1);
  //           }
  //         } else {
  //           doc.pictures.splice(index, 1);
  //         }
  //       }

  //       doc.save();
  //       return {
  //         status: 200,
  //         message: 'Picture deleted',
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
}
