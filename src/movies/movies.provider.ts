
import { Connection } from 'mongoose';
import { MovieSchema } from './movie.schema';
import { Constants } from '../constants'

export const moviesProviders = [
    {   
        provide: Constants.movieModel,
        useFactory: (connection: Connection) => connection.model('movie', MovieSchema),
        inject: [Constants.dbConnection]
    },
];