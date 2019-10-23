import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth) {}

  get user() {
    return this.fireauth.auth.currentUser;
  }

  signin() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.fireauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  signout() {
    this.fireauth.auth.signOut();
  }
}
