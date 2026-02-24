import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PostsService } from './posts.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('media')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }))
  uploadMedia(@UploadedFile() file: Express.Multer.File) {
    return this.postsService.uploadMedia(file);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreatePostDto) {
    const user = req.user as { id: string };
    return this.postsService.createPost(user.id, dto);
  }

  @Get('me')
  getMyPosts(@Req() req: Request, @Query('page') page?: string) {
    const user = req.user as { id: string };
    return this.postsService.getUserPosts(user.id, page ? parseInt(page) : 1);
  }

  @Get()
  getFeed(@Req() req: Request, @Query('page') page?: string) {
    const user = req.user as { id: string };
    return this.postsService.getFeed(user.id, page ? parseInt(page) : 1);
  }

  @Post(':id/like')
  toggleLike(@Req() req: Request, @Param('id') postId: string) {
    const user = req.user as { id: string };
    return this.postsService.toggleLike(user.id, postId);
  }

  @Delete(':id')
  deletePost(@Req() req: Request, @Param('id') postId: string) {
    const user = req.user as { id: string };
    return this.postsService.deletePost(user.id, postId);
  }
}
