import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SportEventsStatusEnum, SportNamesEnum } from '../sport-events.enum';

@Entity()
export class SportEventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  sport: SportNamesEnum;

  @Column()
  status: SportEventsStatusEnum;

  @Column()
  startTime: string;

  @Column()
  finishTime: string;
}
