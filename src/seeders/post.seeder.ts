import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { Seeder, DataFactory } from 'nestjs-seeder';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(Post.name) private readonly post: Model<Post>) {}

  async seed(): Promise<any> {
    // Generate 10 users.
    // Notice that we can optionally pass values that will be accessible in
    // the context that's passed to the @Factory decorator.
    const post = DataFactory.createForClass(Post).generate(10, { zipCode: '10153' });

    // Insert into the database.
    return this.post.insertMany(post);
  }

  async drop(): Promise<any> {
    return this.post.deleteMany({});
  }
}