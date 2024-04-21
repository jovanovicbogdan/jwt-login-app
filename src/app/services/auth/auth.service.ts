import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import ApiResponseSuccess from '../../models/ApiResponseSuccess';
import { AuthUserModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // UserModel - authorized, undefined - initial state, null - unauthorized
  // loggedInUser = signal<UserModel | undefined | null>(undefined);
  private http: HttpClient = inject(HttpClient);

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('asat');
    return authToken !== null;
  }

  login(
    username?: string | null,
    password?: string | null,
  ): Observable<HttpResponse<ApiResponseSuccess<AuthUserModel>>> {
    return this.http.post<ApiResponseSuccess<AuthUserModel>>(
      'http://localhost:8080/api/v1/auth/login',
      { username, password },
      { observe: 'response', withCredentials: true },
    );
  }

  refreshToken(): Observable<HttpResponse<ApiResponseSuccess<AuthUserModel>>> {
    return this.http.post<ApiResponseSuccess<AuthUserModel>>(
      'http://localhost:8080/api/v1/auth/refresh',
      null,
      { observe: 'response', withCredentials: true },
    );
  }

  logout(): Observable<HttpResponse<null>> {
    localStorage.removeItem('asat');
    return this.http.post<null>(
      'http://localhost:8080/api/v1/auth/logout',
      null,
      { observe: 'response', withCredentials: true },
    );
  }
}
