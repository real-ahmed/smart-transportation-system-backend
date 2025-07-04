import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OnboardDto } from './dtos/onboard.dto';
import { OnboardService } from './onboard.service';

@Controller('onboard')
export class OnboardController {
  constructor(private readonly onboardService: OnboardService) {}

  @Post()
  @ApiOperation({ summary: 'Member onboard with student data' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('studentImage'))
  async onboardUser(
    @Req() request: Request,
    @Body() onboardDto: OnboardDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.onboardService.onboardUser(request, onboardDto, file);
  }
}
