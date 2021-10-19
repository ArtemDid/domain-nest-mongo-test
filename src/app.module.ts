import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './domain/domain.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.HOST, { useNewUrlParser: true}),
    BlogModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
