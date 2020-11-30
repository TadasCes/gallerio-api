import { Document } from 'mongoose';
import { IGallery } from './IGallery';

// TODO isskirt tvarkingai user interface kuri naudoju registruojant ir kuri update
export class User extends Document {
  email: string;
  password: string;
  username: string;
  profileImage?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  bio?: string;
  website?: string;
  galleries?: IGallery[];
}
