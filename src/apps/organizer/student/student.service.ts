import { Injectable } from '@nestjs/common';
import { StudentsService } from 'src/users/services/students.service';
import { StudentDto } from './dtos/student.dto';
import { uploadFile } from 'src/common/helpers/file-upload.helper';

@Injectable()
export class StudentService {
    constructor(private readonly studentsService: StudentsService) { }

    async create(request: Request, studentDto: StudentDto, file?: Express.Multer.File) {
        if (file) {
            const imageUrl = await uploadFile(file, 'students');
            studentDto.image = imageUrl;
        }
        return this.studentsService.create(studentDto);
    }


    async findAll(request: Request, page: number = 1, limit: number = 10, filter = {}) {
        return this.studentsService.findAll(page, limit, filter);
    }

    async findOne(request: Request, id: string) {
        return this.studentsService.findOne(id);
    }

    async update(request: Request, id: string, studentDto: StudentDto, file?: Express.Multer.File) {
        if (file) {
            const imageUrl = await uploadFile(file, 'students');
            studentDto.image = imageUrl;
        }
        return this.studentsService.update(id, studentDto);
    }

    async remove(request: Request, id: string) {
        return this.studentsService.remove(id);
    }


}
