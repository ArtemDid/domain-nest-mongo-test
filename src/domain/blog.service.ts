import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    async getPost(ownerId): Promise<Post[]> {
        const post = await this.postModel
            .find({ ownerId: ownerId })
            .exec();
        return post;
    }

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        console.log('createPostDTO: ', createPostDTO)
        const newPost = await new this.postModel(createPostDTO);
        console.log('newPost: ', newPost)
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