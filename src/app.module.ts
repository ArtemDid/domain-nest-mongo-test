import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './domain/domain.module';
import * as process from "process";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restAPI', { useNewUrlParser: true}),
    BlogModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
