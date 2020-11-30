import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ConfigModule } from 'nestjs-dotenv';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/gallerio'),
    DatabaseModule,
    MulterModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
