import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './domain/blog.module';
import * as process from "process";

const username = process.env.POSTGRES_USER || 'Admin';
const password = process.env.POSTGRES_PASSWORD || '12345678';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restAPI', { useNewUrlParser: true }),
    BlogModule,

    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb://Admin:12345678',
    //   database: 'eee',
    //   ssl: true,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
