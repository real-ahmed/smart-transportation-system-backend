import { Injectable } from '@nestjs/common';
import { SupervisorsService } from 'src/users/services/supervisors.service';

@Injectable()
export class ProfileService {
  constructor(private readonly supervisorsService: SupervisorsService) {}
  async updateProfile(request: Request, profileData: any) {
    return await this.supervisorsService.update(
      request['user']['_id'],
      profileData,
    );
  }
  async getProfile(request: Request) {
    return await this.supervisorsService.findOne(request['user']['_id']);
  }
}
