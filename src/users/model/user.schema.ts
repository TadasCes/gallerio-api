import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'
import { IGallery } from './interfaces/IGallery';
import { IPicture } from './interfaces/IPicture';

// TODO padaryt, kad pagrindinis butu email, o ne name
@Schema()
export class User extends Document {
  
  @Prop({ 
    required: true,
    unique: true,
    type: String 
  })
  email: string;
  
  @Prop({ 
    required: true,
    type: String 
  })
  password: string;

  @Prop({ 
    required: true,
    unique: true,
    type: String 
  })
  username: string;

  @Prop({ 
    required: false,
      type: String 
    })
  firstName: string;

  @Prop({ 
    required: false,
    type: String 
  })
  lastName: string;

  @Prop({ 
    required: false,
    type: String 
  })
  profileImage: string;

  @Prop({ 
    required: false,
    type: Number 
  })
  age: number;

  @Prop({ 
    required: false,
    type: String 
  })
  bio: string;

  @Prop({ 
    required: false,
    type: String 
  })
  website: string;

  @Prop({
    required: false,
    type: Array<IGallery>()
  })
  galleries: IGallery[]
}

export const UserSchema = SchemaFactory.createForClass(User);

