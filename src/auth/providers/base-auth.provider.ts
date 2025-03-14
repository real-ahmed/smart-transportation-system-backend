import { Injectable } from '@nestjs/common';
import { IAuthProvider } from '../interfaces/auth-provider.interface';
import { BaseUser } from 'src/users/schemas/base-user.schema';

@Injectable()
export abstract class BaseAuthProvider implements IAuthProvider {
  abstract findAccount(
    identifier: string,
    organizationId?: string,
  ): Promise<BaseUser | null>;
  abstract validateStatus(account: BaseUser): boolean;
  abstract createAccount(
    signUpDto: Record<string, any>,
    file: Express.Multer.File,
  ): Promise<BaseUser>;
}
