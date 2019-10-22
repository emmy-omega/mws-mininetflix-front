import { Injectable } from '@angular/core';
import { of } from 'zen-observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  signup(user) {
    return of();
  }

  signin(signinFo: { email: string; password: string }) {}
}
