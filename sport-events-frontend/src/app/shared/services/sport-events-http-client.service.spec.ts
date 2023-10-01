import { TestBed } from '@angular/core/testing';

import { SportEventsHttpClientService } from './sport-events-http-client.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiClientService', () => {
  let service: SportEventsHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SportEventsHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
