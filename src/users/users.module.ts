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
import { Supervisor, SupervisorSchema } from './schemas/supervisor.schema';
import { SupervisorsService } from './services/supervisors.service';
import { Member, MemberSchema } from './schemas/member.schema';
import { MembersService } from './services/members.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Organizer.name, schema: OrganizerSchema },
      { name: Driver.name, schema: DriverSchema },
      { name: Supervisor.name, schema: SupervisorSchema },
      { name: Member.name, schema: MemberSchema },
    ]),
  ],
  providers: [
    UsersService,
    EmployeesService,
    OrganizersService,
    DriversService,
    SupervisorsService,
    MembersService,
  ],
  exports: [
    UsersService,
    EmployeesService,
    OrganizersService,
    DriversService,
    SupervisorsService,
    MembersService,
  ],
})
export class UsersModule { }
