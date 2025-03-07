import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationService } from '../services/organization.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { User } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddressesService } from 'src/addresses/addresses.service';
import { Address } from 'src/addresses/address.schema';
import { request } from 'http';
import { BaseOrganizerController } from './base-organizer.controller';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController extends BaseOrganizerController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly addressesService: AddressesService,
  ) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create an organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() request: Request,
    @Body() createOrganizationDto: OrganizationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const address: Address = await this.addressesService.findOne(
      createOrganizationDto.addressId,
    );
    return this.organizationService.create(
      request,
      address,
      createOrganizationDto,
      file,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'List of organizations.' })
  findAll(@Req() request: Request) {
    return this.organizationService.findAll(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization by id' })
  @ApiResponse({ status: 200, description: 'The organization data.' })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.organizationService.findOne(request, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: OrganizationDto,
    @Req() request: Request,
  ) {
    return this.organizationService.update(request, id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found.' })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.organizationService.remove(request, id);
  }
}
