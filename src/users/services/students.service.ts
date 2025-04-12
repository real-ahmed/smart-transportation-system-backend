import { Injectable } from '@nestjs/common';
import { Student, StudentDocument } from '../schemas/student.schema';
import { Model } from 'mongoose';
import { getPaginatedResults } from 'src/common/helpers/pagination.helper';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    async create(studentDto): Promise<StudentDocument> {
        const student = new this.studentModel(studentDto);
        return student.save();
    }

    async findAll(page: number = 1, limit: number = 10, filter = {}) {
        return getPaginatedResults(this.studentModel, page, limit, filter);
    }

    async findOne(id: string) {
        return this.studentModel.findById(id);
    }

    async update(id: string, studentDto) {
        return this.studentModel.findByIdAndUpdate(id, studentDto, { new: true });
    }

    async remove(id: string) {
        return this.studentModel.findByIdAndDelete(id);
    }


} 