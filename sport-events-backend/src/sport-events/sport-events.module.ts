import { Module } from '@nestjs/common';
import { SportEventsController } from './sport-events.controller';
import { SportEventsService } from './sport-events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportEventsEntity } from './sport-events.entity/sport-events.entity';

@Module({
  controllers: [SportEventsController],
  providers: [SportEventsService],
  imports: [TypeOrmModule.forFeature([SportEventsEntity])],
})
export class SportEventsModule {}
