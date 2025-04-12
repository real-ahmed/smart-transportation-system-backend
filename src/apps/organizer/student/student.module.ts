import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [UsersModule, OrganizationsModule]
})
export class StudentModule { }
