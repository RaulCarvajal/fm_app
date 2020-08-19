import { TestBed } from '@angular/core/testing';

import { EmgsService } from './emgs.service';

describe('EmgsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmgsService = TestBed.get(EmgsService);
    expect(service).toBeTruthy();
  });
});
