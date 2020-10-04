import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from 'nestjs-dotenv';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    DatabaseModule,
    MoviesModule,
    AuthModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
})
export class AppModule {}
