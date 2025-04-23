import { Injectable } from '@nestjs/common';
import { OnboardDto } from './dtos/onboard.dto';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class OnboardService {
  constructor(private readonly membershipsService: MembershipsService) {}

  onboardUser(request: Request, onboardDto: OnboardDto) {
    const member = request['user']['_id']; // Assuming userId is stored in the request object
    const organization = onboardDto.organization; // Assuming organizationId is part of the onboardDto
    const student = {
      studentName: onboardDto.studentName,
      studentDisabilities: onboardDto.studentDisabilities, // should be an array of strings
      studentSsn: onboardDto.studentSsn,
      street: onboardDto.street,
      city: onboardDto.city,
      state: onboardDto.state,
      phoneNumber: onboardDto.phoneNumber,
      postalCode: onboardDto.postalCode,
    };
    this.membershipsService.createMembershipRequest(
      member,
      organization,
      student,
    );
  }
}
