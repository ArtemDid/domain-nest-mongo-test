import { Module } from '@nestjs/common';
import { BlogController } from './domain.controller';
import { BlogService } from './domain.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/domain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])
 ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule { }