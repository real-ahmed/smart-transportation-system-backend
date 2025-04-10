import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { BusService } from './bus.service';
import { BaseOrganizerController } from '../base-organizer.controller';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BusDto } from './dtos/bus.dto';


@ApiTags('bus')
@Controller('bus')
export class BusController extends BaseOrganizerController {
    constructor(private readonly busService: BusService) {
        super();
    }

    @Post()
    @ApiOperation({ summary: 'Create a bus' })
    @ApiResponse({ status: 201, description: 'The bus has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Req() request: Request, @Body() createBusDto: BusDto) {
        return this.busService.create(request, createBusDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all buses' })
    @ApiResponse({ status: 200, description: 'The buses have been successfully retrieved.' })
    async findAll(
        @Req() request: Request,
        @Query('organization') organization: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.busService.findAll(request, organization, Number(page), Number(limit));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a bus by ID' })
    @ApiResponse({ status: 200, description: 'The bus has been successfully retrieved.' })
    async findOne(@Req() request: Request, @Param('id') id: string) {
        return this.busService.findOne(request, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a bus by ID' })
    @ApiResponse({ status: 200, description: 'The bus has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async update(@Req() request: Request, @Param('id') id: string, @Body() updateBusDto: BusDto) {
        return this.busService.update(request, id, updateBusDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a bus by ID' })
    @ApiResponse({ status: 200, description: 'The bus has been successfully deleted.' })
    async remove(@Req() request: Request, @Param('id') id: string) {
        return this.busService.remove(request, id);
    }
}
