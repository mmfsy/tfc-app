import { TestBed } from '@angular/core/testing';

import { HomeUtilsService } from './home-utils.service';

describe('HomeUtilsService', () => {
  let service: HomeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
