import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import appConfig from './app.config';

export const MONGOOSE_CONFIG: MongooseModuleAsyncOptions = {
  useFactory: () => {
    return {
      uri: appConfig().MONGO_URI,
    };
  },
};
