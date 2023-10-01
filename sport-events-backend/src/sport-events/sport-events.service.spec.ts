import { Test, TestingModule } from '@nestjs/testing';
import { SportEventsService } from './sport-events.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SportEventsEntity } from './sport-events.entity/sport-events.entity';
import { SportEventsStatusEnum, SportNamesEnum } from './sport-events.enum';

describe('SportEventsService', () => {
  let service: SportEventsService;
  let repository: Repository<SportEventsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportEventsService,
        {
          provide: getRepositoryToken(SportEventsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SportEventsService>(SportEventsService);
    repository = module.get<Repository<SportEventsEntity>>(
      getRepositoryToken(SportEventsEntity),
    );
  });

  describe('create', () => {
    it('should create a new sport event', async () => {
      const sportEvent: SportEventsEntity = {
        finishTime: '',
        name: '',
        sport: SportNamesEnum.Basketball,
        startTime: '',
        status: SportEventsStatusEnum.Active,
      };

      jest.spyOn(repository, 'save').mockResolvedValue(sportEvent);

      const result = await service.create(sportEvent);

      expect(result).toBe(sportEvent);
      expect(repository.save).toHaveBeenCalledWith(sportEvent);
    });
  });

  describe('getAll', () => {
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

      jest.spyOn(repository, 'find').mockResolvedValue(sportEvents);

      const result = await service.getAll();

      expect(result).toBe(sportEvents);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
