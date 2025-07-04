import { Injectable, BadRequestException } from '@nestjs/common';
import { OnboardDto } from './dtos/onboard.dto';
import { MembershipsService } from 'src/memberships/memberships.service';
import { uploadFile } from 'src/common/helpers/file-upload.helper';

@Injectable()
export class OnboardService {
  constructor(private readonly membershipsService: MembershipsService) {}

  onboardUser(
    request: Request,
    onboardDto: OnboardDto,
    file?: Express.Multer.File,
  ) {
    // Validate request and user data
    if (!request || !request['user'] || !request['user']['_id']) {
      throw new BadRequestException('Invalid user request');
    }

    // Validate onboard DTO
    if (!onboardDto) {
      throw new BadRequestException('Onboard data is required');
    }

    const member = request['user']['_id'];
    const organization = onboardDto.organization;

    // Additional validation for required fields
    if (!organization) {
      throw new BadRequestException('Organization is required');
    }

    const student = {
      studentName: onboardDto.studentName,
      studentDisabilities: onboardDto.studentDisabilities || [], // Default to empty array if not provided
      studentSsn: onboardDto.studentSsn,
      street: onboardDto.street,
      city: onboardDto.city,
      state: onboardDto.state,
      phoneNumber: onboardDto.phoneNumber,
      postalCode: onboardDto.postalCode,
    };

    // Handle file upload if provided
    if (file) {
      const imageUrl = uploadFile(file, 'students');
      student['studentImage'] = imageUrl;
    }

    return this.membershipsService.createMembershipRequest(
      member,
      organization,
      student,
    );
  }
}
