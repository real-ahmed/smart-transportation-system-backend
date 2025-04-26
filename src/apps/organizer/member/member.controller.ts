import { Controller, Query, Param, Get, Req } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { BaseOrganizerController } from '../base-organizer.controller';
@Controller('member')
export class MemberController extends BaseOrganizerController {
    constructor(private readonly memberService: MemberService) {
        super();
    }
    @Get()
    @ApiOperation({ summary: 'Get all members' })
    @ApiQuery({ name: 'organizationId', required: true, type: String })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Returns paginated list of members' })
    async findAll(
        @Req() request: Request,
        @Query('organizationId') organizationId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number
    ) {
        return this.memberService.findAll(request, page, limit, organizationId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a member by ID' })
    @ApiParam({ name: 'id', description: 'Member ID' })
    @ApiResponse({ status: 200, description: 'Returns the member' })
    @ApiResponse({ status: 404, description: 'Member not found' })
    async findOne(@Param('id') id: string) {
        return this.memberService.findOne(id);
    }

    @Get('memberships/requests')
    @ApiOperation({ summary: 'Get all memberships request' })
    @ApiQuery({ name: 'organization', required: true, type: String })
    async getMembershipRequests(@Param('organization') organization: string) {
        return this.memberService.getMembershipRequests(organization);
    }


}