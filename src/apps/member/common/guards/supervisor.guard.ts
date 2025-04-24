// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';

// import { Request } from 'express';
// import { SupervisorsService } from 'src/users/services/supervisors.service';

// @Injectable()
// export class SupervisorGuard implements CanActivate {
//   constructor(private readonly supervisorService: SupervisorsService) { }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();

//     try {
//       const supervisor = await this.supervisorService.findByUser(
//         request['user']['_id'],
//       );

//       request['user']['supervisor'] = supervisor;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('User is not a supervisor');
//     }
//   }
// }
