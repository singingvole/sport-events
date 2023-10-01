import { NestFactory } from '@nestjs/core';
import { SeedService } from './database/seeders/seed.service';
import { SeedModule } from './database/seeders/seed.module';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.close();
}

bootstrap();
