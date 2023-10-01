import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportEventsEntity } from './sport-events.entity/sport-events.entity';
import { UpdateSportEventDTO } from './sport-events.entity/update-sport-event-dto';
import { SportEventsStatusEnum } from './sport-events.enum';

@Injectable()
export class SportEventsService {
  constructor(
    @InjectRepository(SportEventsEntity)
    private eventsRepository: Repository<SportEventsEntity>,
  ) {}

  async create(event: SportEventsEntity): Promise<SportEventsEntity> {
    return await this.eventsRepository.save(event);
  }

  async getAll(): Promise<SportEventsEntity[]> {
    return await this.eventsRepository.find();
  }

  async update(
    id: string,
    updateEventDto: UpdateSportEventDTO,
  ): Promise<SportEventsEntity> {
    const sportEvent: SportEventsEntity | null =
      await this.eventsRepository.findOne({
        where: {
          id: id,
        },
      });

    if (!sportEvent) {
      throw new NotFoundException('Event not found');
    }

    if (
      this.canChangeStatus(
        sportEvent.status as SportEventsStatusEnum,
        updateEventDto.status,
      )
    ) {
      const updatedItem: SportEventsEntity = {
        ...sportEvent,
        ...updateEventDto,
      };
      await this.eventsRepository.save(updatedItem);
      return updatedItem;
    } else {
      throw new HttpException(
        'Status change not allowed',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  private canChangeStatus(
    currentStatus: SportEventsStatusEnum,
    newStatus: SportEventsStatusEnum,
  ): boolean {
    if (currentStatus === SportEventsStatusEnum.Active) {
      return (
        newStatus === SportEventsStatusEnum.Inactive ||
        newStatus === SportEventsStatusEnum.Finished
      );
    } else if (currentStatus === SportEventsStatusEnum.Inactive) {
      return (
        newStatus === SportEventsStatusEnum.Active ||
        newStatus === SportEventsStatusEnum.Finished
      );
    } else {
      return false;
    }
  }
}
