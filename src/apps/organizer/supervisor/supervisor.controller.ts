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
import { SupervisorDto } from './dtos/supervisor.dto';
import { SupervisorService } from './supervisor.service';

@ApiTags('supervisor')
@Controller('supervisor')
export class SupervisorController extends BaseOrganizerController {
  constructor(private readonly supervisorService: SupervisorService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create a supervisor' })
  @ApiResponse({
    status: 201,
    description: 'The supervisor has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() request: Request,
    @Body() createSupervisorDto: SupervisorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.supervisorService.create(request, createSupervisorDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all supervisors' })
  @ApiResponse({
    status: 200,
    description: 'List of supervisors retrieved successfully.',
  })
  async findAll(
    @Req() request: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.supervisorService.findAll(request, Number(page), Number(limit));
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a supervisor by ID' })
  @ApiResponse({ status: 200, description: 'Supervisor retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Supervisor not found.' })
  async findOne(@Req() request: Request, @Param('id') id: string) {
    return this.supervisorService.findOne(request, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a supervisor' })
  @ApiResponse({ status: 200, description: 'Supervisor updated successfully.' })
  @ApiResponse({ status: 404, description: 'Supervisor not found.' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateSupervisorDto: SupervisorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.supervisorService.update(request, id, updateSupervisorDto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a supervisor' })
  @ApiResponse({ status: 200, description: 'Supervisor deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Supervisor not found.' })
  async remove(@Req() request: Request, @Param('id') id: string) {
    return this.supervisorService.remove(request, id);
  }
}
