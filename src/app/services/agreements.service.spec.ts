import { TestBed } from '@angular/core/testing';

import { AgreementsService } from './agreements.service';

describe('AgreementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgreementsService = TestBed.get(AgreementsService);
    expect(service).toBeTruthy();
  });
});
