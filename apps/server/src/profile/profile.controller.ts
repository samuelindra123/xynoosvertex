import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ProfileService } from './profile.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('me')
  getMyProfile(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.profileService.getProfile(user.id);
  }

  @Patch('me')
  updateMyProfile(@Req() req: Request, @Body() dto: UpdateProfileDto) {
    const user = req.user as { id: string };
    return this.profileService.updateProfile(user.id, dto);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as { id: string };
    return this.profileService.updateAvatar(user.id, file);
  }
}
