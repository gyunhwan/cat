import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //pipe를 통해 transform 및 validation
  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
