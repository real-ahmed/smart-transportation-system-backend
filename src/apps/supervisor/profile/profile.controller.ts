import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dtos/profile.dto';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() request) {
    return this.profileService.getProfile(request);
  }
  @Put()
  async updateProfile(@Req() request, @Body() profileData: ProfileDto) {
    return this.profileService.updateProfile(request, profileData);
  }
}
