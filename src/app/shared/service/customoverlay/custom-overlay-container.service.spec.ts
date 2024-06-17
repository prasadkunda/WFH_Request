import { TestBed } from '@angular/core/testing';

import { CustomOverlayContainerService } from './custom-overlay-container.service';

describe('CustomOverlayContainerService', () => {
  let service: CustomOverlayContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOverlayContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
