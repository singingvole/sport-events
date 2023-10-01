import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SportEventsService } from './sport-events.service';
import { SportEventsEntity } from './sport-events.entity/sport-events.entity';
import { UpdateSportEventDTO } from './sport-events.entity/update-sport-event-dto';

@Controller('events')
export class SportEventsController {
  constructor(private readonly eventsService: SportEventsService) {}
  @Post()
  async Create(@Body() event: SportEventsEntity): Promise<SportEventsEntity> {
    return await this.eventsService.create(event);
  }

  @Get()
  GetAll(): Promise<SportEventsEntity[]> {
    return this.eventsService.getAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDTO: UpdateSportEventDTO,
  ): Promise<SportEventsEntity> {
    return this.eventsService.update(id, updateEventDTO);
  }
}
