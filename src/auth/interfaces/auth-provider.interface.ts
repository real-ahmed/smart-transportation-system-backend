import { BaseUser } from 'src/users/schemas/base-user.schema';

export interface IAuthProvider {
  findAccount(
    identifier: string,
    organizationId?: string,
  ): Promise<BaseUser | null>;
  validateStatus(account: BaseUser): boolean;
  createAccount(signUpDto: Record<string, any>): Promise<BaseUser>;
}
