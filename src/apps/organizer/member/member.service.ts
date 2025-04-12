import { Injectable } from '@nestjs/common';
import { MembersService } from 'src/users/services/members.service';

@Injectable()
export class MemberService {
    constructor(
        private readonly membersService: MembersService
    ) { }

    async findAll(request: Request, page: number = 1, limit: number = 10, organizationId: string) {
        const filter = {
            organizations: [organizationId],
        };
        return this.membersService.findAll(page, limit, filter);
    }

    async findOne(id: string) {
        return this.membersService.findOne(id);
    }


}
