import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { eq, and, desc, sql } from 'drizzle-orm';
import { Client, Storage, ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { db } from '../db/index.js';
import { posts, postLikes, users, comments, savedPosts } from '../db/schema.js';
import { CreatePostDto } from './dto/create-post.dto.js';

@Injectable()
export class PostsService {
  private readonly storage: Storage;
  private readonly bucketId: string;
  private readonly ALLOWED_IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private readonly ALLOWED_VIDEO = ['video/mp4', 'video/quicktime', 'video/webm'];
  private readonly MAX_IMAGE = 10 * 1024 * 1024;
  private readonly MAX_VIDEO = 50 * 1024 * 1024;

  constructor() {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);
    this.storage = new Storage(client);
    this.bucketId = process.env.APPWRITE_POSTS_BUCKET_ID!;
  }

  async uploadMedia(file: Express.Multer.File): Promise<{ mediaUrl: string; mediaType: string }> {
    const isImage = this.ALLOWED_IMAGE.includes(file.mimetype);
    const isVideo = this.ALLOWED_VIDEO.includes(file.mimetype);
    if (!isImage && !isVideo) throw new BadRequestException('Only images or videos allowed');
    if (isImage && file.size > this.MAX_IMAGE) throw new BadRequestException('Image must be under 10 MB');
    if (isVideo && file.size > this.MAX_VIDEO) throw new BadRequestException('Video must be under 50 MB');

    const uploaded = await this.storage.createFile(
      this.bucketId,
      ID.unique(),
      InputFile.fromBuffer(file.buffer, file.originalname),
    );
    const mediaUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${this.bucketId}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
    return { mediaUrl, mediaType: isImage ? 'image' : 'video' };
  }

  async createPost(userId: string, dto: CreatePostDto) {
    const [post] = await db
      .insert(posts)
      .values({ userId, content: dto.content, tags: dto.tags ?? [], mediaUrl: dto.mediaUrl, mediaType: dto.mediaType })
      .returning();

    await db.update(users).set({ postsCount: sql`${users.postsCount} + 1` }).where(eq(users.id, userId));

    const [user] = await db
      .select({ name: users.name, alias: users.alias, avatarUrl: users.avatarUrl })
      .from(users).where(eq(users.id, userId));

    return { ...post, user, likedByMe: false };
  }

  async getFeed(userId: string, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const rows = await db
      .select({
        id: posts.id, content: posts.content, tags: posts.tags,
        mediaUrl: posts.mediaUrl, mediaType: posts.mediaType,
        likesCount: posts.likesCount, commentsCount: posts.commentsCount, createdAt: posts.createdAt,
        userId: posts.userId, userName: users.name,
        userAlias: users.alias, userAvatarUrl: users.avatarUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .orderBy(desc(posts.createdAt))
      .limit(limit).offset(offset);

    const likedRows = await db.select({ postId: postLikes.postId }).from(postLikes).where(eq(postLikes.userId, userId));
    const likedSet = new Set(likedRows.map(r => r.postId));

    const savedIds = await this.getSavedPostIds(userId);
    const savedSet = new Set(savedIds);

    return rows.map(r => ({
      id: r.id, content: r.content, tags: r.tags,
      mediaUrl: r.mediaUrl, mediaType: r.mediaType,
      likesCount: r.likesCount, commentsCount: r.commentsCount, createdAt: r.createdAt,
      likedByMe: likedSet.has(r.id),
      savedByMe: savedSet.has(r.id),
      user: { id: r.userId, name: r.userName, alias: r.userAlias, avatarUrl: r.userAvatarUrl },
    }));
  }

  async toggleLike(userId: string, postId: string) {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    if (!post) throw new NotFoundException('Post not found');
    const [existing] = await db.select().from(postLikes).where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
    if (existing) {
      await db.delete(postLikes).where(eq(postLikes.id, existing.id));
      const [u] = await db.update(posts).set({ likesCount: sql`${posts.likesCount} - 1` }).where(eq(posts.id, postId)).returning({ likesCount: posts.likesCount });
      return { liked: false, likesCount: u.likesCount };
    } else {
      await db.insert(postLikes).values({ postId, userId });
      const [u] = await db.update(posts).set({ likesCount: sql`${posts.likesCount} + 1` }).where(eq(posts.id, postId)).returning({ likesCount: posts.likesCount });
      return { liked: true, likesCount: u.likesCount };
    }
  }

  async getUserPosts(userId: string, requestingUserId: string, page = 1, limit = 30) {
    const offset = (page - 1) * limit;
    const rows = await db
      .select({
        id: posts.id, content: posts.content, tags: posts.tags,
        mediaUrl: posts.mediaUrl, mediaType: posts.mediaType,
        likesCount: posts.likesCount, commentsCount: posts.commentsCount, createdAt: posts.createdAt,
        userId: posts.userId, userName: users.name,
        userAlias: users.alias, userAvatarUrl: users.avatarUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt))
      .limit(limit).offset(offset);

    const likedRows = await db.select({ postId: postLikes.postId }).from(postLikes).where(eq(postLikes.userId, requestingUserId));
    const likedSet = new Set(likedRows.map(r => r.postId));

    const savedIds = await this.getSavedPostIds(requestingUserId);
    const savedSet = new Set(savedIds);

    return rows.map(r => ({
      id: r.id, content: r.content, tags: r.tags,
      mediaUrl: r.mediaUrl, mediaType: r.mediaType,
      likesCount: r.likesCount, commentsCount: r.commentsCount, createdAt: r.createdAt,
      likedByMe: likedSet.has(r.id),
      savedByMe: savedSet.has(r.id),
      user: { id: r.userId, name: r.userName, alias: r.userAlias, avatarUrl: r.userAvatarUrl },
    }));
  }

  async deletePost(userId: string, postId: string) {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));
    if (!post) throw new NotFoundException('Post not found');
    if (post.userId !== userId) throw new ForbiddenException('Not your post');
    if (post.mediaUrl) {
      const match = post.mediaUrl.match(/files\/([^/]+)\/view/);
      if (match) await this.storage.deleteFile(this.bucketId, match[1]).catch(() => null);
    }
    await db.delete(posts).where(eq(posts.id, postId));
    await db.update(users).set({ postsCount: sql`GREATEST(${users.postsCount} - 1, 0)` }).where(eq(users.id, userId));
    return { deleted: true };
  }

  // ── Comments ──────────────────────────────────────────────────────────────

  async getComments(postId: string) {
    const rows = await db
      .select({
        id: comments.id, content: comments.content, createdAt: comments.createdAt,
        userId: comments.userId,
        userName: users.name, userAlias: users.alias, userAvatarUrl: users.avatarUrl,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));
    return rows.map(r => ({
      id: r.id, content: r.content, createdAt: r.createdAt,
      user: { id: r.userId, name: r.userName, alias: r.userAlias, avatarUrl: r.userAvatarUrl },
    }));
  }

  async addComment(userId: string, postId: string, content: string) {
    const [post] = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, postId));
    if (!post) throw new NotFoundException('Post not found');
    const [comment] = await db.insert(comments).values({ postId, userId, content }).returning();
    await db.update(posts).set({ commentsCount: sql`${posts.commentsCount} + 1` }).where(eq(posts.id, postId));
    const [u] = await db.select({ name: users.name, alias: users.alias, avatarUrl: users.avatarUrl }).from(users).where(eq(users.id, userId));
    return { ...comment, user: { id: userId, ...u } };
  }

  async deleteComment(userId: string, commentId: string) {
    const [c] = await db.select().from(comments).where(eq(comments.id, commentId));
    if (!c) throw new NotFoundException('Comment not found');
    if (c.userId !== userId) throw new ForbiddenException('Not your comment');
    await db.delete(comments).where(eq(comments.id, commentId));
    await db.update(posts).set({ commentsCount: sql`GREATEST(${posts.commentsCount} - 1, 0)` }).where(eq(posts.id, c.postId));
    return { deleted: true };
  }

  // ── Saved Posts ───────────────────────────────────────────────────────────

  async toggleSave(userId: string, postId: string) {
    const [post] = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, postId));
    if (!post) throw new NotFoundException('Post not found');
    const [existing] = await db.select().from(savedPosts).where(and(eq(savedPosts.postId, postId), eq(savedPosts.userId, userId)));
    if (existing) {
      await db.delete(savedPosts).where(eq(savedPosts.id, existing.id));
      return { saved: false };
    } else {
      await db.insert(savedPosts).values({ postId, userId });
      return { saved: true };
    }
  }

  async getSavedPosts(userId: string) {
    const rows = await db
      .select({
        id: posts.id, content: posts.content, tags: posts.tags,
        mediaUrl: posts.mediaUrl, mediaType: posts.mediaType,
        likesCount: posts.likesCount, commentsCount: posts.commentsCount, createdAt: posts.createdAt,
        savedAt: savedPosts.createdAt,
      })
      .from(savedPosts)
      .innerJoin(posts, eq(savedPosts.postId, posts.id))
      .where(eq(savedPosts.userId, userId))
      .orderBy(desc(savedPosts.createdAt));
    return rows;
  }

  async getSavedPostIds(userId: string): Promise<string[]> {
    const rows = await db.select({ postId: savedPosts.postId }).from(savedPosts).where(eq(savedPosts.userId, userId));
    return rows.map(r => r.postId);
  }
}
