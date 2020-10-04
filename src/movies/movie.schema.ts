import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { User } from 'src/users/user.interface';

@Schema()
export class Movie extends Document {
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
  director: string;


  @Prop({
    required: false,
    type: [String]
  })
  actors: Array<string>
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
