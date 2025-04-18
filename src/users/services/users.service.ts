import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { BaseUsersService } from './base-users.service';
import { MembersService } from './members.service';
import { OrganizersService } from './organizers.service';

@Injectable()
export class UsersService extends BaseUsersService<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly organizersService: OrganizersService,
    private readonly membersService: MembersService,
  ) {
    super(userModel);
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return this.userModel
      .findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      })
      .exec();
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return this.userModel.find({ _id: { $in: ids } }).exec();
  }

  async findDriversByOrganization(organizationId: string): Promise<string[]> {
    // Implementation would involve joining with Driver collection and filtering by organization
    // This is a simplified mock implementation
    const drivers = await this.userModel
      .find({ role: 'driver', organization: organizationId })
      .select('_id')
      .exec();

    return drivers.map((driver) => driver._id.toString());
  }

  async findSupervisorsByOrganization(
    organizationId: string,
  ): Promise<string[]> {
    // Implementation would involve joining with Supervisor collection and filtering by organization
    // This is a simplified mock implementation
    const supervisors = await this.userModel
      .find({ role: 'supervisor', organization: organizationId })
      .select('_id')
      .exec();

    return supervisors.map((supervisor) => supervisor._id.toString());
  }

  async findStudentsByOrganization(organizationId: string): Promise<string[]> {
    // Implementation would involve joining with Student collection and filtering by organization
    // This is a simplified mock implementation
    const students = await this.userModel
      .find({ role: 'student', organization: organizationId })
      .select('_id')
      .exec();

    return students.map((student) => student._id.toString());
  }

  async findMembersByOrganization(organizationId: string): Promise<string[]> {
    // Implementation would involve joining with Member collection and filtering by organization
    // This is a simplified mock implementation
    const members = await this.userModel
      .find({ role: 'member', organization: organizationId })
      .select('_id')
      .exec();

    return members.map((member) => member._id.toString());
  }

  async findAllByOrganization(organizationId: string): Promise<string[]> {
    // Implementation would involve filtering all users associated with the organization
    // This is a simplified mock implementation
    const users = await this.userModel
      .find({ organization: organizationId })
      .select('_id')
      .exec();

    return users.map((user) => user._id.toString());
  }

  async getAccountType(_id: any): Promise<any> {
    const organizer = await this.organizersService.findByUser(_id);
    const member = await this.membersService.findByUser(_id);
    if (organizer && member) {
      return 'both';
    } else if (member) {
      return 'member';
    } else if (organizer) {
      return 'organizer';
    }
    return 'none';
  }
}
