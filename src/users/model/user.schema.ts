import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop({ 
      required: true,
      unique: true,
      type: String 
    })
  name: string;

  @Prop({ 
    required: false,
    type: String 
  })
  password: string;

  @Prop({ 
    required: false,
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
    type: [String]
  })
  friends: Array<string>
}

export const UserSchema = SchemaFactory.createForClass(User);
