import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { response } from 'express';
import { MovieDto } from './movie.dto';
import { Movie } from './movie.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  async getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id')
  async getOneMovie(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getOneMovie(id);
  }

  @Post()
  async createMovie(@Body() movieDto: MovieDto) {
    return this.moviesService
      .createMovie(movieDto)
      .then(() =>
        response.status(200).json({
          code: 200,
          message: 'Success',
        }),
      )
      .catch((err: Error) => {
        throw new HttpException(err.message, 400);
        //  "statusCode": 404,
        //"message": "Cannot read property 'get' of undefined"

        //paklaust kaip sita error perskaityt kai ta pati useri prideda
      });
  }

  @Put(":id")
  async addnewActor(@Param('id') id: string, @Body('actorId') actorId: string) {
    return this.moviesService
      .addnewActor(id, actorId)
      .then(() => {
        response.status(200).json({
          code: 200,
          message: 'Success',
        });
      })
      .catch((err: Error) => {
        throw new HttpException(err.message, 400);
      });
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
