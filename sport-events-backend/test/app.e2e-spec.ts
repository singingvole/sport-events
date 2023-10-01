import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  SportEventsStatusEnum,
  SportNamesEnum,
} from '../src/sport-events/sport-events.enum';

describe('SportEventsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/events (GET)', () => {
    return request(app.getHttpServer()).get('/events').expect(200);
  });

  it('/events (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/events/20542487-75dc-4061-871c-b3cd456090b0')
      .expect(404);
  });

  it('/events (POST)', () => {
    const payload = {
      name: 'e2e test name',
      sport: SportNamesEnum.Football,
      status: SportEventsStatusEnum.Active,
      startTime: '2023-10-02T04:11:45.126Z',
      finishTime: '2024-12-09T19:23:08.124Z',
    };
    return request(app.getHttpServer())
      .post('/events')
      .send(payload)
      .expect(201);
  });

  it('should be able to change event status', async () => {
    const payload = {
      name: 'e2e test name',
      sport: SportNamesEnum.Football,
      status: SportEventsStatusEnum.Active,
      startTime: '2023-10-02T04:11:45.126Z',
      finishTime: '2024-12-09T19:23:08.124Z',
    };
    const response = await request(app.getHttpServer())
      .post('/events')
      .send(payload);

    await request(app.getHttpServer())
      .patch(`/events/${response.body.id}`)
      .send({
        status: SportEventsStatusEnum.Inactive,
      })
      .expect(200);
    return response;
  });
});
