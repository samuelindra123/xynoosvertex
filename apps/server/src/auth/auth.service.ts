import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { MailService } from '../mail/mail.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, dto.email.toLowerCase()));

    if (existing.length > 0) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const verificationToken = uuidv4();
    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await db.insert(users).values({
      name: dto.name,
      email: dto.email.toLowerCase(),
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await this.mail.sendVerificationEmail(dto.email, dto.name, verificationToken);

    return { message: 'Registration successful. Please check your email to verify your account.' };
  }

  async verifyEmail(token: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.verificationToken, token));

    if (!user) throw new BadRequestException('Invalid or expired verification token');
    if (user.isVerified) return { message: 'Email already verified' };

    if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
      throw new BadRequestException('Verification token has expired. Please register again.');
    }

    await db
      .update(users)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return { message: 'Email verified successfully. You can now log in.' };
  }

  async login(dto: LoginDto) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, dto.email.toLowerCase()));

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwt.sign(payload);

    return {
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, dto.email.toLowerCase()));

    // Always return success to prevent email enumeration
    if (!user || !user.isVerified) {
      return { message: 'If that email is registered, you will receive a reset link.' };
    }

    const resetToken = uuidv4();
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await db
      .update(users)
      .set({ resetToken, resetTokenExpiresAt, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    await this.mail.sendPasswordResetEmail(user.email, user.name, resetToken);

    return { message: 'If that email is registered, you will receive a reset link.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, dto.token));

    if (!user) throw new BadRequestException('Invalid or expired reset token');

    if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
      throw new BadRequestException('Reset token has expired. Please request a new one.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return { message: 'Password reset successfully. You can now log in.' };
  }
}
