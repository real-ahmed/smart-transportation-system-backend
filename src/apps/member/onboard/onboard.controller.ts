import { Body, Controller, Post, Req } from '@nestjs/common';
import { OnboardDto } from './dtos/onboard.dto';
import { OnboardService } from './onboard.service';

@Controller('onboard')
export class OnboardController {
  constructor(private readonly onboardService: OnboardService) {}

  @Post()
  async onboardUser(@Req() request, @Body() onboardDto: OnboardDto) {
    this.onboardService.onboardUser(request, onboardDto);
  }
}
