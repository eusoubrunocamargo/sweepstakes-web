import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when no user is loggen id', () => {
    localStorage.clear();
    expect(service.getUser()).toBeNull();
  });

  it('should return false when not authenticated', () => {
    localStorage.clear();
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
