import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(Post.name) private readonly post: Model<Post>) {}

  async seed(): Promise<any> {
    const post = DataFactory.createForClass(Post).generate(10, { zipCode: '10153' });
    return this.post.insertMany(post);
  }

  async drop(): Promise<any> {
    return this.post.deleteMany({});
  }
}