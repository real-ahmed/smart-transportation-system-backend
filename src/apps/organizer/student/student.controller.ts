import { Controller, Post, UseInterceptors, Req, UploadedFile, Get, Body, Query, Put, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StudentDto } from './dtos/student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseOrganizerController } from '../base-organizer.controller';

@Controller('student')
@ApiTags('Student')
export class StudentController extends BaseOrganizerController {
    constructor(private readonly studentService: StudentService) {
        super();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new student' })
    @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    async create(@Req() request: Request, @Body() studentDto: StudentDto, @UploadedFile() file?: Express.Multer.File) {
        return this.studentService.create(request, studentDto, file);
    }

    @Get()
    @ApiOperation({ summary: 'Get all students' })
    @ApiResponse({ status: 200, description: 'The students have been successfully retrieved.' })
    async findAll(@Req() request: Request, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.studentService.findAll(request, page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a student by ID' })
    @ApiResponse({ status: 200, description: 'The student has been successfully retrieved.' })
    async findOne(@Req() request: Request, @Param('id') id: string) {
        return this.studentService.findOne(request, id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a student by ID' })
    @ApiResponse({ status: 200, description: 'The student has been successfully updated.' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    async update(@Req() request: Request, @Param('id') id: string, @Body() studentDto: StudentDto, @UploadedFile() file?: Express.Multer.File) {
        return this.studentService.update(request, id, studentDto, file);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a student by ID' })
    @ApiResponse({ status: 200, description: 'The student has been successfully deleted.' })
    async delete(@Req() request: Request, @Param('id') id: string) {
        return this.studentService.remove(request, id);
    }
    
}
