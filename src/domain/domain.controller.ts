import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogService } from './domain.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId, CreateUserDto } from './shared/validate-object-id.pipes';


@Controller('domain')
export class BlogController {

    constructor(private blogService: BlogService) { }

    @Get('/')
    async getPosts(@Res() res, @Query() params) {
        const posts = await this.blogService.getPosts(params);
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('byOwner/:ownerId')
    async getPost(@Res() res, @Param('ownerId') ownerId) {
        const post = await this.blogService.getPost(ownerId);
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);
    }

    @Post('/post')
    @UsePipes(new ValidationPipe())
    async addPost(@Res() res, @Body() createPostDTO: CreateUserDto) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }

    @Post('/search')
    async searchPost(@Res() res, @Query('q') q) {
        const newPost = await this.blogService.searchPost(q);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }

    @Put(':domainId')
    async editPost(
        @Res() res,
        @Param('domainId', new ValidateObjectId()) domainId,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(domainId, createPostDTO);
        if (!editedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }


    @Delete('/delete')
    async deletePost(@Res() res, @Query('domainId', new ValidateObjectId()) domainId) {
        const deletedPost = await this.blogService.deletePost(domainId);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}