import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './domain/domain.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restAPI', { useNewUrlParser: true}),
    BlogModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
