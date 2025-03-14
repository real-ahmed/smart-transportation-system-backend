import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './schemas/user.schema';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { EmployeesService } from './services/employees.service';
import { Organizer, OrganizerSchema } from './schemas/organizer.schema';
import { OrganizersService } from './services/organizers.service';
import { DriversService } from './services/drivers.service';
import { Driver, DriverSchema } from './schemas/driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Organizer.name, schema: OrganizerSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  providers: [
    UsersService,
    EmployeesService,
    OrganizersService,
    DriversService,
  ],
  exports: [UsersService, EmployeesService, OrganizersService, DriversService],
})
export class UsersModule {}
