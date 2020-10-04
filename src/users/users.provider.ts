
import { Connection } from 'mongoose';
import { UserSchema } from './model/user.schema';
import { Constants } from '../constants'

export const usersProviders = [
    {   
        provide: Constants.userModel,
        useFactory: (connection: Connection) => connection.model('user', UserSchema),
        inject: [Constants.dbConnection]
    },
];