import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { StudentsService } from 'src/users/services/students.service';

@Injectable()
export class StudentService {
  constructor(private readonly studentsService: StudentsService) {}

  async getAll(page, limit, request: Request) {
    return this.studentsService.findAll(page, limit, {
      $or: [
        { guardian: new Types.ObjectId(request['user']['_id']) },
        { followers: { $in: [new Types.ObjectId(request['user']['_id'])] } },
      ],
    });
  }

  // --- CRUD methods ---
  async findOne(id: string) {
    return this.studentsService.findOne(id);
  }

  async update(id: string, updateStudentDto: any) {
    return this.studentsService.update(id, updateStudentDto);
  }

  
}
