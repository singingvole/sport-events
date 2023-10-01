import { Test, TestingModule } from '@nestjs/testing';
import { SportEventsController } from './sport-events.controller';
import { SportEventsService } from './sport-events.service';
import { SportEventsEntity } from './sport-events.entity/sport-events.entity';
import { UpdateSportEventDTO } from './sport-events.entity/update-sport-event-dto';
import { SportEventsStatusEnum, SportNamesEnum } from './sport-events.enum';

describe('SportEventsController', () => {
  let controller: SportEventsController;
  let service: SportEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportEventsController],
      providers: [
        {
          provide: SportEventsService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SportEventsController>(SportEventsController);
    service = module.get<SportEventsService>(SportEventsService);
  });

  it('should create a sport event', async () => {
    const sportEvent: SportEventsEntity = {
      finishTime: '',
      name: '',
      sport: SportNamesEnum.Basketball,
      startTime: '',
      status: SportEventsStatusEnum.Active,
    };

    jest.spyOn(service, 'create').mockResolvedValue(sportEvent);

    const result = await controller.Create(sportEvent);

    expect(result).toBe(sportEvent);
    expect(service.create).toHaveBeenCalledWith(sportEvent);
  });

  it('should get all sport events', async () => {
    const sportEvents: SportEventsEntity[] = [
      {
        finishTime: '',
        name: '',
        sport: SportNamesEnum.Basketball,
        startTime: '',
        status: SportEventsStatusEnum.Active,
      },
    ];

    jest.spyOn(service, 'getAll').mockResolvedValue(sportEvents);

    const result = await controller.GetAll();

    expect(result).toBe(sportEvents);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should update a sport event', async () => {
    const id = 'b01ce4d0-3069-4445-b4b5-84ebc134205c';
    const updateEventDTO: UpdateSportEventDTO = {
      status: SportEventsStatusEnum.Inactive,
    };
    const updatedEvent: SportEventsEntity = {
      finishTime: '',
      name: '',
      sport: SportNamesEnum.Basketball,
      startTime: '',
      status: SportEventsStatusEnum.Active,
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedEvent);

    const result = await controller.update(id, updateEventDTO);

    expect(result).toBe(updatedEvent);
    expect(service.update).toHaveBeenCalledWith(id, updateEventDTO);
  });
});
