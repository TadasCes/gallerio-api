import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserUtility } from './utility/user.utility';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  private userUtility = new UserUtility(this.userModel);

  async getUserFriendList(@Param() name: string) {
    const id = await this.userUtility.getUserId(name);
    return this.userModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(id),
        },
      },
      {
        $project: {
          _id: 0,
          friends: 1,
        },
      },
    ]);
  }

  async addFriendToList(name: string, friend: string) {
    const userId = await this.userUtility.getUserId(name);
    const friendId = await this.userUtility.getUserId(friend);

    return this.userModel
      .find(
        {
          _id: {
            $in: [userId, friendId],
          },
        },
        (err, users) => {
          if (err) {
            console.log(err);
          } else {
            if (
              !users[0].friends?.includes(friendId) &&
              !users[1].friends?.includes(userId)
            ) {
              users[0].friends?.push(friendId);
              users[1].friends?.push(userId);
              users[0].save();
              users[1].save();
            }
          }
        },
      )
      .then(() => {
        return {
          status: 200,
          message: 'Friend added',
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

  async removeFriendFromList(name: string, friend: string) {
    const userId = await this.userUtility.getUserId(name);
    const friendId = await this.userUtility.getUserId(friend);

    this.userModel
      .find(
        {
          _id: {
            $in: [userId, friendId],
          },
        },
        (err, users) => {
          if (err) {
            console.log(err);
          } else {
            if (
              users[0].friends?.includes(friendId) &&
              users[1].friends?.includes(userId)
            ) {
              users[0].friends?.splice(users[0].friends?.indexOf(friendId), 1);
              users[1].friends?.splice(users[1].friends?.indexOf(userId), 1);
              users[0].save();
              users[1].save();
            }
          }
        },
      )
      .then(() => {
        return {
          status: 200,
          message: 'Friend deleted',
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
