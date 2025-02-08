import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(
      body.identifier,
      body.password,
      body.organization,
    );
  }

  @Post('signup')
  signUp(@Body() SignInDto: Record<string, any>) {
    // return this.authService.signIn();
  }
}
