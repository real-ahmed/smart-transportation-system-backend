import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { BaseUser } from 'src/users/schemas/base-user.schema';
import { UserStatus } from 'src/users/enums/user-status.enum';
import { BaseAuthProvider } from './base-auth.provider';
import { uploadFile } from 'src/common/helpers/file-upload.helper';

@Injectable()
export class UserAuthProvider extends BaseAuthProvider {
  constructor(private usersService: UsersService) {
    super();
  }

  async findAccount(identifier: string): Promise<BaseUser | null> {
    return this.usersService.findByIdentifier(identifier);
  }

  validateStatus(account: BaseUser): boolean {
    return account.status === UserStatus.ACTIVE;
  }

  async createAccount(
    signUpDto: Record<string, any>,
    file: Express.Multer.File,
  ): Promise<BaseUser> {
    const imageUrl = await uploadFile(file, 'organizer');
    signUpDto.image = imageUrl;
    return this.usersService.create(signUpDto);
  }

  getAccountType(_id: any): any {
    return this.usersService.getAccountType(_id);
  }
}
