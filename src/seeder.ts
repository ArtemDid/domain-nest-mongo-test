import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, userSchema } from './schemas/post.schema';
import { UsersSeeder } from './seeders/post.seeder';

seeder({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/restAPI'),
    MongooseModule.forFeature([{ name: Post.name, schema: userSchema }]),
  ],
}).run([UsersSeeder]);