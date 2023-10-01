import { TestBed } from '@angular/core/testing';
import { RetryOnErrorInterceptor } from '~/shared/interceptors/retry-on-error-interceptor';

describe('RetryInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RetryOnErrorInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: RetryOnErrorInterceptor = TestBed.inject(RetryOnErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
