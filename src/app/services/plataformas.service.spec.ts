import { TestBed, inject } from '@angular/core/testing';

import { PlataformasService } from './plataformas.service';

describe('PlataformasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlataformasService]
    });
  });

  it('should be created', inject([PlataformasService], (service: PlataformasService) => {
    expect(service).toBeTruthy();
  }));
});
