import {
  Body,
  Controller,
  Post,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  //signIn method
  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed in successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(
      body.identifier,
      body.password,
      body.organization,
    );
  }

  // signUp method
  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User signed up successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @UseInterceptors(FileInterceptor('image'))
  signUp(@Body() body: SignUpDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.signUp(body, file);
  }
}
