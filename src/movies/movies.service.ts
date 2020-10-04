import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model } from 'mongoose';
import { MovieDto } from './movie.dto';
import { Movie } from './movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<Movie>,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find({});
  }

  async getOneMovie(@Param('id') id: string): Promise<Movie> {
    return this.movieModel.findOne({ _id: id });
  }

  async createMovie(movieDto: MovieDto) {
    return this.movieModel.create(movieDto);
  }

  async addnewActor(id: string, actorId: string) {
    return this.movieModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { actors: actorId } },
    );
  }

  async deleteMovie(id: string) {
    return this.movieModel.findOneAndDelete({ _id: id });
  }
}
