import { TestBed } from '@angular/core/testing';

import { HomeApiService } from './home-api.service';

describe('HomeApiService', () => {
  let service: HomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeApiService]
    });
    service = TestBed.inject(HomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadProducts() should return data', () => {
    service.loadProducts().subscribe(data => {
      expect(data).toBeTruthy();
    });
  });
});
