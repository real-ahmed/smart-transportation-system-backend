import {
  Controller,
  Get,
  Query,
  Req,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAll(
    @Req() request: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.studentService.getAll(page, limit, request);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: any) {
    return this.studentService.update(id, updateStudentDto);
  }
}
