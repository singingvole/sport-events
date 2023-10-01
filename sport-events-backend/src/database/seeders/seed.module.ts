import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEventsSeedModule } from './sport-events.seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/eventsDB.sqlite',
      entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SportEventsSeedModule,
  ],
})
export class SeedModule {}
