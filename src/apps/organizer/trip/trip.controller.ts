import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDto } from './dtos/trip.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Trip } from 'src/trips/trip.schema';
@ApiTags('Trip')
@Controller('trip')
export class TripController {
    constructor(private readonly tripService: TripService) {
    }

    @ApiOperation({ summary: 'Create a new trip' })
    @ApiResponse({
        status: 201,
        description: 'Trip created successfully',
        type: Trip
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request - Invalid input'
    })
    @Post()
    async createTrip(@Body() createTripDto: TripDto) {
        return this.tripService.createTrip(createTripDto);
    }







    @ApiOperation({ summary: 'Get all trips by organization' })
    @ApiResponse({
        status: 200,
        description: 'Trips retrieved successfully',
        type: [Trip]
    })
    @Get()
    async findAll(@Query('organizationId') organizationId: string, @Query('page') page: number, @Query('limit') limit: number) {
        return this.tripService.findAll(organizationId, page, limit);
    }



    @ApiOperation({ summary: 'Get a trip by ID' })
    @ApiResponse({
        status: 200,
        description: 'Trip retrieved successfully',
        type: Trip
    })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.tripService.findOne(id);
    }


    @ApiOperation({ summary: 'Update a trip by ID' })
    @ApiResponse({
        status: 200,
        description: 'Trip updated successfully',
        type: Trip
    })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTripDto: TripDto) {
        return this.tripService.update(id, updateTripDto);
    }


    @ApiOperation({ summary: 'Delete a trip by ID' })
    @ApiResponse({
        status: 200,
        description: 'Trip deleted successfully',
        type: Trip
    })
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.tripService.delete(id);
    }


}
