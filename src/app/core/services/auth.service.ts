import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthOptions, AuthProvider, User } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: Observable<firebase.default.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map((user) => user !== null));
  }

  authenticate({
    isSignIn,
    provider,
    user,
  }: AuthOptions): Promise<firebase.default.auth.UserCredential> {
    let operation: Promise<firebase.default.auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn
        ? this.signInWithEmail(user)
        : this.signUpWithEmail(user);
    }

    return operation;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email).then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  private signInWithEmail({
    email,
    password,
  }: User): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({
    email,
    password,
    name,
  }: User): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPopup(
    provider: AuthProvider
  ): Promise<firebase.default.auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new firebase.default.auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        signInProvider = new firebase.default.auth.GoogleAuthProvider();
        break;
      case AuthProvider.Twitter:
        signInProvider = new firebase.default.auth.TwitterAuthProvider();
        break;
      case AuthProvider.Microsoft:
        signInProvider = new firebase.default.auth.OAuthProvider(
          'microsoft.com'
        );
        break;
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }
}
