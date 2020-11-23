import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { IPicture } from './IPicture';

@Schema()
export class User extends Document {
  @Prop({ 
      required: true,
      unique: true,
      type: String 
    })
  name: string;

  @Prop({ 
    required: true,
    unique: true,
    type: String 
  })
  lastName: string;

  @Prop({ 
    required: true,
    type: String 
  })
  password: string;

  @Prop({ 
    required: true,
    type: String 
  })
  email: string;

  @Prop({ 
    required: false,
    type: Number 
  })
  age: number;

  @Prop({ 
    required: false,
    type: String 
  })
  website: string;

  @Prop({
    required: false,
    type: [String]
  })
  friends: Array<string>

  @Prop({
    required: false,
    type: Object
  })
  address: IAddress

  @Prop({
    required: false,
    type: Array<IPicture>()
  })
  pictures: Array<IPicture>
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IAddress {
  country: string;
  city: string;
  streetAddress: string;
  ziPCode: number;
}
