import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from './app.config';

export const JWT_CONFIG: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().JWT_SECRET,
      signOptions: { expiresIn: appConfig().JWT_EXPIRATION },
    };
  },
};
