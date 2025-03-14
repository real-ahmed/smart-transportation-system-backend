import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseOrganizerController } from '../base-organizer.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverDto } from './dtos/driver.dto';
import { DriverService } from './driver.service';

@ApiTags('driver')
@Controller('driver')
export class DriverController extends BaseOrganizerController {
  constructor(private readonly driverService: DriverService) {
    super();
  }
  @Post()
  @ApiOperation({ summary: 'Create an driver' })
  @ApiResponse({
    status: 201,
    description: 'The driver has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() request: Request,
    @Body() createDriverDto: DriverDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.driverService.create();
  }
}
