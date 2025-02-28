import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { OrganizersService } from 'src/users/services/organizers.service';

@Injectable()
export class OnboardService {
  constructor(
    private readonly organizationsService: OrganizationService,
    private readonly organizerService: OrganizersService,
  ) {}

  async onboard(
    userId: any,
    onboardDto: OrganizationDto,
    file: Express.Multer.File,
  ) {
    const organizer = await this.organizerService.createOrganizer(userId);

    return this.organizationsService.create(organizer, onboardDto, file);
  }
}
