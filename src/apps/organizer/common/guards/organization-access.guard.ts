import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class OrganizationAccessGuard implements CanActivate {
    constructor(private readonly organizationsService: OrganizationsService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const organizationId = request.params.organizationId || request.body.organizationId;

        return this.checkUserAccessToOrganization(user, organizationId);
    }

    private async checkUserAccessToOrganization(user: any, organizationId: string): Promise<boolean> {
        const organization = await this.organizationsService.findOne({ _id: organizationId, owner: user._id });
        if (!organization) {
            return false;
        }
        return true;
    }
}