import { TestBed } from '@angular/core/testing';

import { TrafficTimerService } from './traffic-timer.service';

describe('TrafficTimerService', () => {
  let service: TrafficTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrafficTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
