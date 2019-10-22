import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { stringify } from '@angular/compiler/src/util';

const userSignInStub = { email: 'vixel@mail.com', password: 'p@s$w#rd' };
const userSignUpStub = { username: 'vixel', uid: 'ts231001' };

describe.skip('AuthService', () => {
  let ctrl: HttpTestingController;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  test('#signup creates new user', () => {
    ctrl = TestBed.get(HttpTestingController);
    service.signup(userSignInStub).subscribe(user => {
      expect(user).toEqual(expect.objectContaining(userSignUpStub));
    });
    const op = ctrl.expectOne('http://127.0.0.1:4000/auth/signup');
    op.flush(userSignUpStub);
  });

  test('#signin logins user', () => {
    ctrl = TestBed.get(HttpTestingController);
    expect(service.signin(userSignInStub)).resolves.toBeDefined();
  });
});
