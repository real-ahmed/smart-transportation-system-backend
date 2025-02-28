import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  NestInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { OnboardService } from '../services/onboard.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('onboard')
export class OnboardController {
  constructor(private readonly onboardService: OnboardService) {}
  @Post()
  @ApiOperation({ summary: 'organizer onboard' })
  @UseInterceptors(FileInterceptor('image'))
  onboard(
    @Body() body: OrganizationDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: any, // Extracting user from the request using the custom decorator
  ) {
    return this.onboardService.onboard(user.account._id, body, file);
  }
}
