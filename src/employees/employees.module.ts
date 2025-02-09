import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee , EmployeeSchema  } from './schemas/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],

  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
