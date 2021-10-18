import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
var faker = require('faker');

@Schema()
export class Post extends Document {
  @Factory(() => {
    return faker.internet.domainName();
  })
  @Prop({ required: true })
  domainName: string;

  @Factory(() => {
    const minAge = 1;
    const maxAge = 1000;
    return Math.round(Math.random() * (maxAge - minAge) + minAge);
  })
  @Prop({ required: true })
  ownerId: string;

  @Factory(() => {
    return faker.name.findName();
  })
  @Prop({ required: true })
  ownerName: string;
}

export const userSchema = SchemaFactory.createForClass(Post);