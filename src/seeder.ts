import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, userSchema } from './schemas/post.schema';
import { UsersSeeder } from './seeders/post.seeder';
require('dotenv').config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.HOST),
    MongooseModule.forFeature([{ name: Post.name, schema: userSchema }]),
  ],
}).run([UsersSeeder]);