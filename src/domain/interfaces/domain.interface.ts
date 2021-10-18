import { Document } from 'mongoose';

export interface Post extends Document {
    readonly domainName: string;
    readonly ownerName: string;
    readonly ownerId: string;
  }