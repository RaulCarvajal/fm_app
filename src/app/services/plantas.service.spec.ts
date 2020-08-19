import { TestBed } from '@angular/core/testing';

import { PlantasService } from './plantas.service';

describe('PlantasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantasService = TestBed.get(PlantasService);
    expect(service).toBeTruthy();
  });
});
