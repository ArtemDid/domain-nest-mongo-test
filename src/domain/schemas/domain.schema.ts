import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    domainName: String,
    ownerName: String,
    ownerId: String,
})