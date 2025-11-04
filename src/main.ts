import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseWrapperInterceptor } from './common/interceptors/response-wrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  app.enableCors({
    origin: 'http://localhost:5173', // hoặc ['http://localhost:5173']
    credentials: true, // nếu bạn dùng cookie, session
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
