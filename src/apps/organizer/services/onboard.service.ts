import { ConflictException, Injectable } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { OrganizersService } from 'src/users/services/organizers.service';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class OnboardService {
  constructor(
    private readonly organizationsService: OrganizationService,
    private readonly organizerService: OrganizersService,
    private readonly addressesService: AddressesService,
  ) {}

  async onboard(
    request: Request,
    onboardDto: OrganizationDto,
    file: Express.Multer.File,
  ) {
    let organizer;
    organizer = await this.organizerService.findByUser(request['user']['_id']);
    if (organizer) {
      throw new ConflictException('User already onboarded as organizer');
    }
    organizer = await this.organizerService.create(request['user']['_id']);

    const address = await this.addressesService.create({
      street: onboardDto.street,
      city: onboardDto.city,
      state: onboardDto.state,
      phoneNumber: onboardDto.phoneNumber,
      postalCode: onboardDto.postalCode,
    });

    return this.organizationsService.create(
      organizer,
      address,
      onboardDto,
      file,
    );
  }
}
