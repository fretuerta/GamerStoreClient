import { TestBed } from '@angular/core/testing';

import { AlquileresService } from './alquileres.service';

describe('AlquileresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlquileresService = TestBed.get(AlquileresService);
    expect(service).toBeTruthy();
  });
});
