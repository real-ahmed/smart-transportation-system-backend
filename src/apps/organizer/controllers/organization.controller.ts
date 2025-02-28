import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrganizationDto } from '../dtos/organization.dto';
import { User } from 'src/common/decorators/user.decorator'; // Create this custom decorator to access the user
import { OrganizationService } from '../services/organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Add organization' })
  @UseInterceptors(FileInterceptor('image'))
  onboard(
    @Body() body: OrganizationDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: any, // Extracting user from the request using the custom decorator
  ) {
    // Accessing user ID from the extracted user object
    const userId = user._id;
    // Proceed with your logic, for example:
    return this.organizationService.create(userId, body, file);
  }
}
