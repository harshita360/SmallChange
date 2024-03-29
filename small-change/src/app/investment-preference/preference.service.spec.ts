import { TestBed } from '@angular/core/testing';
import { UserServiceService } from '../services/user-service.service';

import { PreferenceService } from './preference.service';

describe('PreferenceService', () => {
  let service: PreferenceService;
  let mockUserService:any;

  beforeEach(() => {
    mockUserService=jasmine.createSpyObj(['getLoginUserId'])
    TestBed.configureTestingModule({
      providers:[{provide:UserServiceService, useValue:mockUserService}]
    });
    service = TestBed.inject(PreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
