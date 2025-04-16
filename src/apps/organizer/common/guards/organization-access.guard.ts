import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class OrganizationAccessGuard implements CanActivate {
    constructor(private readonly organizationsService: OrganizationsService) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Check organization ID from multiple possible locations
        const organizationId =
            request.params.organizationId ||
            request.body.organizationId ||
            request.query.organizationId ||
            request.body.organization ||
            request.query.organization ||
            request.params.organization;

        if (!organizationId) {
            return true; // Skip check if no organization ID provided
        }

        const hasAccess = await this.checkUserAccessToOrganization(user, organizationId);
        if (!hasAccess) {
            throw new UnauthorizedException('You do not have access to this organization');
        }

        return true;
    }

    private async checkUserAccessToOrganization(user: any, organizationId: string): Promise<boolean> {
        if (!user || !organizationId) {
            return false;
        }

        const organization = await this.organizationsService.findOne({
            _id: organizationId,
            $or: [
                { owner: user.id },
                { members: user.id }
            ]
        });

        return !!organization;
    }
}