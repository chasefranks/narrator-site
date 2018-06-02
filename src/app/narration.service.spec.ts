import { TestBed, inject } from '@angular/core/testing';

import { NarrationService } from './narration.service';

describe('NarrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NarrationService]
    });
  });

  it('should be created', inject([NarrationService], (service: NarrationService) => {
    expect(service).toBeTruthy();
  }));
});
