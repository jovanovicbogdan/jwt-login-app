import { Injectable, signal } from '@angular/core';
import { LoggedInUserModel } from '../../models/LoggedInUserModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // LoggedInUserModel - authorized, undefined - initial state, null - unauthorized
  loggedInUser = signal<LoggedInUserModel | undefined | null>(undefined);
}
