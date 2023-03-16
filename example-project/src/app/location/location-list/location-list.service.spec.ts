import { TestBed } from '@angular/core/testing';

import { LocationListService } from './location-list.service';

describe('LocationListService', () => {
  let service: LocationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
