import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  NestInterceptor,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/common/helpers/file-upload.helper';
import { OnboardService } from '../services/onboard.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { request } from 'http';
import { OnboardDto } from '../dtos/onboard.dto ';

@Controller('onboard')
export class OnboardController {
  constructor(private readonly onboardService: OnboardService) {}
  @Post()
  @ApiOperation({ summary: 'organizer onboard' })
  @UseInterceptors(FileInterceptor('image'))
  onboard(
    @Req() request: Request,
    @Body() body: OnboardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.onboardService.onboard(request, body, file);
  }
}
