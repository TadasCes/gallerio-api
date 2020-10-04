import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Movie, MovieSchema } from './movie.schema';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema}]), UsersModule],
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
