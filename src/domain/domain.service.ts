import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/domain.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { CreateUserDto } from './shared/validate-object-id.pipes';
const Fuse = require("fuse.js")

const DEFAULT_SKIP: number = 0;
const DEFAULT_LIMIT: number = 10;

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async getPosts(params): Promise<Post[]> {
        const posts = await this.postModel.find()
            .skip(parseInt(params.skip) || DEFAULT_SKIP)
            .limit(parseInt(params.limit) || DEFAULT_LIMIT);
        return posts;
    }

    async getPost(ownerId): Promise<Post[]> {
        const post = await this.postModel
            .find({ ownerId: ownerId })
            .exec();
        return post;
    }

    async searchPost(q): Promise<Post[]> {
        const post = await this.postModel.find().exec();

        const fuse = await new Fuse(post, { keys: ['domainName'] })
        const result = fuse.search(q)

        return result;
    }

    async addPost(createPostDTO: CreateUserDto): Promise<Post> {
        const newPost = await new this.postModel(createPostDTO);
        return newPost.save();
    }

    async editPost(domainId, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(domainId, createPostDTO, { new: true });
        return editedPost;
    }

    async deletePost(domainId): Promise<any> {
        const deletedPost = await this.postModel
            .findByIdAndRemove(domainId);
        return deletedPost;
    }

}