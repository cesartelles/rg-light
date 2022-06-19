import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserActiveGuard } from './user-active.guard';

describe('UserActiveGuard', () => {
  let guard: UserActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports:[
        RouterTestingModule
      ],
    });
    guard = TestBed.inject(UserActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
