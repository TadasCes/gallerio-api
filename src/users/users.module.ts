import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './model/user.schema'
import { FriendsService } from './friends.service';
 
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, FriendsService],
  exports: [UsersService]
})
export class UsersModule {}
