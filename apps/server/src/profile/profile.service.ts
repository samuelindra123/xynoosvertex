import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, and, ne } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfileService {
  private readonly ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private readonly MAX_SIZE = 5 * 1024 * 1024; // 5 MB

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

    // Store local path — swap for Appwrite URL later
    const avatarUrl = `/uploads/avatars/${file.filename}`;

    const [updated] = await db
      .update(users)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning({ avatarUrl: users.avatarUrl });

    return { avatarUrl: updated.avatarUrl };
  }
}
