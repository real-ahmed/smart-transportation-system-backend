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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationService } from '../services/organization.service';
import { OrganizationDto } from '../dtos/organization.dto';
import { User } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('organization')
@Controller('organization')
export class OrganizationController {
  // constructor(private readonly organizationService: OrganizationService) {}

  // @Post()
  // @ApiOperation({ summary: 'Create an organization' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The organization has been successfully created.',
  // })
  // @ApiResponse({ status: 400, description: 'Bad Request.' })
  // @UseInterceptors(FileInterceptor('image'))
  // create(
  //   @Body() createOrganizationDto: OrganizationDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.organizationService.create(createOrganizationDto);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Get all organizations' })
  // @ApiResponse({ status: 200, description: 'List of organizations.' })
  // findAll(@User() user: any) {
  //   return this.organizationService.findAll(user);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get an organization by id' })
  // @ApiResponse({ status: 200, description: 'The organization data.' })
  // @ApiResponse({ status: 404, description: 'Organization not found.' })
  // findOne(@Param('id') id: string) {
  //   return this.organizationService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update an organization' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The organization has been successfully updated.',
  // })
  // @ApiResponse({ status: 404, description: 'Organization not found.' })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOrganizationDto: OrganizationDto,
  // ) {
  //   return this.organizationService.update(+id, updateOrganizationDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete an organization' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The organization has been successfully deleted.',
  // })
  // @ApiResponse({ status: 404, description: 'Organization not found.' })
  // remove(@Param('id') id: string) {
  //   return this.organizationService.remove(+id);
  // }
}
