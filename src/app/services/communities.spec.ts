import { TestBed } from '@angular/core/testing';

import { Communities } from './communities';

describe('Communities', () => {
  let service: Communities;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Communities);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
