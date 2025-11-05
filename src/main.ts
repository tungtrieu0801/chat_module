import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseWrapperInterceptor } from './common/interceptors/response-wrapper.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Chat service API')
    .setDescription('API documentation for Chat Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalInterceptors(new ResponseWrapperInterceptor());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors({
    origin: '*', // hoặc domain cụ thể
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Server is running on port: ${process.env.PORT}`);
  console.log(`📘 Swagger docs: http://localhost:3000/api-docs`);
}
bootstrap();
