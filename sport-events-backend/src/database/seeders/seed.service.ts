import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportEventsEntity } from '../../sport-events/sport-events.entity/sport-events.entity';
import {
  SportEventsStatusEnum,
  SportNamesEnum,
} from '../../sport-events/sport-events.enum';
import { sportEventNames } from './sport-events-seed-data';

@Injectable()
export class SeedService {
  sportEventNames: string[] = sportEventNames;

  constructor(
    @InjectRepository(SportEventsEntity)
    private readonly sportEventsRepository: Repository<SportEventsEntity>,
  ) {}

  async seed() {
    for (let i = 0; i < 100; i++) {
      await this.createSportEvent();
    }
  }

  private async createSportEvent() {
    const sportEventsEntity = new SportEventsEntity();
    sportEventsEntity.name =
      this.sportEventNames[
        Math.floor(Math.random() * this.sportEventNames.length)
      ];
    sportEventsEntity.sport = this.getRandomEnumValue(SportNamesEnum);
    sportEventsEntity.status = this.getRandomEnumValue(SportEventsStatusEnum);

    const maxDate = new Date();
    maxDate.setDate(new Date().getDate() + 1);
    sportEventsEntity.startTime = this.getRandomDate(new Date(), maxDate);
    sportEventsEntity.finishTime = this.getRandomDate(
      maxDate,
      new Date('2025-12-31'),
    );
    await this.sportEventsRepository.save(sportEventsEntity);
  }

  private getRandomEnumValue<T>(enumType: T): T[keyof T] {
    const enumValues = Object.values(enumType as any);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T[keyof T];
  }

  private getRandomDate(startDate: Date, endDate: Date): string {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp =
      startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return new Date(randomTimestamp).toISOString();
  }
}
