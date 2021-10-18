import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
var faker = require('faker');

@Schema()
export class Post extends Document {
  // @Factory will automatically inject faker to the function that you pass.
  // @Factory(faker => faker.random.arrayElement(['male', 'female']))
  // @Prop({ required: true })
  // gender: string;

  // You could get the previously generated value using the passed context.
  @Factory(() => {
    return faker.internet.domainName();
  })
  @Prop({ required: true })
  domainName: string;

  // You could also use custom function without faker.
  @Factory(() => {
    const minAge = 1;
    const maxAge = 1000;
    return Math.round(Math.random() * (maxAge - minAge) + minAge);
  })
  @Prop({ required: true })
  ownerId: string;

  // You could get the previously generated value using the passed context.
  @Factory(() => {
    return faker.name.findName();
  })
  @Prop({ required: true })
  ownerName: string;



  // You could also use static value.
  // @Factory('admin')
  // @Prop({ required: true })
  // role: string; 

  // If you pass predefined values to the `generate` function, you will be 
  // able to access it in the context.
  // @Factory((faker, ctx) => `${faker.address.streetAddress()} ${ctx.zipCode}`)
  // @Prop({ required: true })
  // address: string;
}

export const userSchema = SchemaFactory.createForClass(Post);