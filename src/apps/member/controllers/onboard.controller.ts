import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller('onboard')
export class OnboardController {
  @Get()
  getOnboard() {
    return { message: 'Onboard endpoint' };
  }
}
