import { TestBed } from '@angular/core/testing';

import { SearchesService } from './searches.service';

describe('SearchesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchesService = TestBed.get(SearchesService);
    expect(service).toBeTruthy();
  });
});
