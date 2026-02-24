import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, and, ne } from 'drizzle-orm';
import { Client, Storage, ID } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfileService {
  private readonly ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private readonly MAX_SIZE = 5 * 1024 * 1024;

  private readonly storage: Storage;
  private readonly bucketId: string;

  constructor() {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    this.storage = new Storage(client);
    this.bucketId = process.env.APPWRITE_BUCKET_ID!;
  }

  async getProfile(userId: string) {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        alias: users.alias,
        bio: users.bio,
        website: users.website,
        avatarUrl: users.avatarUrl,
        postsCount: users.postsCount,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    // Check alias uniqueness if changing
    if (dto.alias) {
      const [existing] = await db
        .select({ id: users.id })
        .from(users)
        .where(and(eq(users.alias, dto.alias), ne(users.id, userId)));

      if (existing) throw new ConflictException('Alias already taken');
    }

    const [updated] = await db
      .update(users)
      .set({
        ...(dto.alias !== undefined && { alias: dto.alias }),
        ...(dto.bio !== undefined && { bio: dto.bio }),
        ...(dto.website !== undefined && { website: dto.website }),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        alias: users.alias,
        bio: users.bio,
        website: users.website,
        avatarUrl: users.avatarUrl,
      });

    return updated;
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    if (!this.ALLOWED_MIME.includes(file.mimetype)) {
      throw new BadRequestException('Only JPEG, PNG, WebP, or GIF images are allowed');
    }
    if (file.size > this.MAX_SIZE) {
      throw new BadRequestException('File size must be under 5 MB');
    }

    // Delete old Appwrite file if exists
    const [current] = await db
      .select({ avatarUrl: users.avatarUrl })
      .from(users)
      .where(eq(users.id, userId));

    if (current?.avatarUrl) {
      const match = current.avatarUrl.match(/files\/([^/]+)\/view/);
      if (match) {
        await this.storage.deleteFile(this.bucketId, match[1]).catch(() => null);
      }
    }

    // Upload to Appwrite
    const uploaded = await this.storage.createFile(
      this.bucketId,
      ID.unique(),
      InputFile.fromBuffer(file.buffer, file.originalname),
    );

    const avatarUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${this.bucketId}/files/${uploaded.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`;

    const [updated] = await db
      .update(users)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning({ avatarUrl: users.avatarUrl });

    return { avatarUrl: updated.avatarUrl };
  }
}
