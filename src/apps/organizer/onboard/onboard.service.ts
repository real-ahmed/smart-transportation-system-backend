import { ConflictException, Injectable } from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationDto } from '../organization/dtos/organization.dto';
import { OrganizersService } from 'src/users/services/organizers.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { OnboardDto } from './dtos/onboard.dto ';

@Injectable()
export class OnboardService {
  constructor(
    private readonly organizationsService: OrganizationService,
    private readonly organizerService: OrganizersService,
    private readonly addressesService: AddressesService,
  ) {}

  async onboard(
    request: Request,
    onboardDto: OnboardDto,
    file: Express.Multer.File,
  ) {
    let organizer;
    organizer = await this.organizerService.findByUser(request['user']['_id']);
    if (organizer) {
      throw new ConflictException('User already onboarded as organizer');
    }
    organizer = await this.organizerService.create(request['user']['_id']);
    request['user']['organizer'] = organizer;

    const address = await this.addressesService.create({
      street: onboardDto.street,
      city: onboardDto.city,
      state: onboardDto.state,
      phoneNumber: onboardDto.phoneNumber,
      postalCode: onboardDto.postalCode,
      owner: request['user']['_id'],
    });
    return this.organizationsService.create(request, address, onboardDto, file);
  }
}
