import { HttpService, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './model/user.schema'
import { PictureService } from './pictures.service';
 
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, PictureService],
  exports: [UsersService]
})
export class UsersModule {}
