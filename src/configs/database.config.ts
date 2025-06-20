import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongooseConfig = (config: ConfigService): MongooseModuleOptions => ({
  uri: config.get<string>('DB_HOST'),
  user: config.get<string>('DB_USERNAME'),
  pass: config.get<string>('DB_PASSWORD'),
  dbName: config.get<string>('DB_NAME'),
});