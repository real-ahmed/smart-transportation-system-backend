import { Injectable } from '@nestjs/common';
import { BusesService } from 'src/buses/buses.service';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class BusService {

    constructor(private readonly busesService: BusesService, private readonly organizationService: OrganizationsService) { }
    async create(request: Request, createBusDto: Record<string, any>) {
        return this.busesService.create(createBusDto);
    }

    async findAll(request: Request, organization: string, page: number = 1, limit: number = 10) {
        const user = request['user'];
        const organizations = await this.organizationService.findAll(-1, -1, { owner: user.id });
        const organizationIds = organizations.results.map(organization => organization._id);;
        if (organization in organizationIds) {
            return this.busesService.findAll(page, limit, { organization: organization });
        }
    }

    async findOne(request: Request, id: string) {
        return this.busesService.findById(id);
    }

    async update(request: Request, id: string, updateBusDto: Record<string, any>) {
        return this.busesService.update(id, updateBusDto);
    }

    async remove(request: Request, id: string) {
        return this.busesService.delete(id);
    }
}
