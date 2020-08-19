import { TestBed } from '@angular/core/testing';

import { NamespacesService } from './namespaces.service';

describe('NamespacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NamespacesService = TestBed.get(NamespacesService);
    expect(service).toBeTruthy();
  });
});
