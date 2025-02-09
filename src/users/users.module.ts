import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './schemas/user.schema';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { EmployeesService } from './services/employees.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [UsersService, EmployeesService],
  exports: [UsersService, EmployeesService],
})
export class UsersModule {}
