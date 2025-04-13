import { Controller, Query, Get, Req, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MaintenanceDto } from './dtos/maintenance.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('bus maintenance')
@Controller('maintenance')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) { }

    @Post()
    @ApiOperation({ summary: 'Create a maintenance record' })
    @ApiResponse({ status: 201, description: 'The maintenance record has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createMaintenanceDto: MaintenanceDto) {
        return this.maintenanceService.create(createMaintenanceDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all maintenance records' })
    @ApiResponse({ status: 200, description: 'The maintenance records have been successfully retrieved.' })
    async findAll(
        @Req() request: Request,
        @Query('organizationId') organizationId: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.maintenanceService.findAll(request, Number(page), Number(limit), organizationId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a maintenance record by ID' })
    @ApiResponse({ status: 200, description: 'The maintenance record has been successfully retrieved.' })
    async findOne(@Req() request: Request, @Param('id') id: string) {
        return this.maintenanceService.findOne(request, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a maintenance record by ID' })
    @ApiResponse({ status: 200, description: 'The maintenance record has been successfully updated.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async update(@Req() request: Request, @Param('id') id: string, @Body() updateMaintenanceDto: MaintenanceDto) {
        return this.maintenanceService.update(request, id, updateMaintenanceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a maintenance record by ID' })
    @ApiResponse({ status: 200, description: 'The maintenance record has been successfully deleted.' })
    async remove(@Req() request: Request, @Param('id') id: string) {
        return this.maintenanceService.remove(request, id);
    }
}
