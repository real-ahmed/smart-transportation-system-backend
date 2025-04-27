import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports: [UsersModule],
  exports: [StudentService],
})
export class StudentModule {}
