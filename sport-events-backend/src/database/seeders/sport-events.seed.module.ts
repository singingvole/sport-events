import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEventsEntity } from '../../sport-events/sport-events.entity/sport-events.entity';

@Module({
  providers: [SeedService],
  imports: [TypeOrmModule.forFeature([SportEventsEntity])],
})
export class SportEventsSeedModule {}
