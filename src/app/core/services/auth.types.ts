/* eslint-disable @typescript-eslint/naming-convention */
export enum AuthProvider {
  Email,
  Facebook,
  Google,
  Twitter,
  Microsoft,
}

export interface User {
  name?: string;
  email: string;
  password: string;
}

export interface AuthOptions {
  isSignIn: boolean;
  provider: AuthProvider;
  user: User;
}
