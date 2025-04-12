import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
  @ApiOperation({ summary: 'Create a driver' })
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
    return this.driverService.create(request, createDriverDto, file);
  }




  @Get()
  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({
    status: 200,
    description: 'List of drivers retrieved successfully.',
  })
  async findAll(
    @Req() request: Request,
    @Query('organizationId') organizationId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.driverService.findAll(request, Number(page), Number(limit), organizationId);
  }




  @Get(':id')
  @ApiOperation({ summary: 'Get a driver by ID' })
  @ApiResponse({ status: 200, description: 'Driver retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  async findOne(@Req() request: Request, @Param('id') id: string) {
    return this.driverService.findOne(request, id);
  }





  
  @Put(':id')
  @ApiOperation({ summary: 'Update a driver' })
  @ApiResponse({ status: 200, description: 'Driver updated successfully.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateDriverDto: DriverDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // return this.driverService.update(request, id, updateDriverDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver' })
  @ApiResponse({ status: 200, description: 'Driver deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Driver not found.' })
  async remove(@Req() request: Request, @Param('id') id: string) {
    return this.driverService.remove(request, id);
  }
}
