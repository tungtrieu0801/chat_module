import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: Number((config.get<string>('DB_PORT') || '5432').trim()),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  autoLoadEntities: true,
  synchronize: false, // Set to true only in development, false in production
  // ssl: {
  //   rejectUnauthorized: true, // Set to true if you want to enforce SSL certificate validation
  // },
});