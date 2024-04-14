import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import ApiResponseSuccess from '../../models/ApiResponseSuccess';
import { AuthService } from '../auth/auth.service';
import UserModel from '../../models/UserModel';
import ApiResponseFailure from '../../models/ApiResponseFailure';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  get<T>(url: string): Promise<T | ApiResponseFailure> {
    return new Promise(resolve => {
      this.http
        .get<ApiResponseSuccess<T>>(url, {
          observe: 'response',
        })
        .subscribe({
          next: res => resolve(res.body?.data as T),
          error: err => {
            if (err.status === HttpStatusCode.Unauthorized) {
              this.handleUnauthorized<T>(url).then(result => {
                resolve(result);
              });
            } else {
              resolve(
                new ApiResponseFailure(
                  err.url,
                  err.message,
                  err.status,
                  new Date(),
                ),
              );
            }
          },
        });
    });
  }

  post<T>(url: string, data?: any): Promise<T | ApiResponseFailure> {
    return new Promise(resolve => {
      this.http
        .post<ApiResponseSuccess<T>>(url, data, {
          observe: 'response',
        })
        .subscribe({
          next: res => resolve(res.body?.data as T),
          error: err => {
            if (err.status === HttpStatusCode.Unauthorized) {
              this.handleUnauthorized<T>(url).then(result => {
                resolve(result);
              });
            } else {
              resolve(
                new ApiResponseFailure(
                  err.url,
                  err.message,
                  err.status,
                  new Date(),
                ),
              );
            }
          },
        });
    });
  }

  private handleUnauthorized<T>(url: string): Promise<T | ApiResponseFailure> {
    return new Promise(resolve => {
      this.authService.refreshToken().subscribe({
        next: res => {
          const user = res.body?.data as UserModel;
          localStorage.setItem('asat', user.authToken);
          this.http
            .get<ApiResponseSuccess<T>>(url, {
              observe: 'response',
            })
            .subscribe({
              next: res => resolve(res.body?.data as T),
              error: err => {
                localStorage.removeItem('asat');
                resolve(
                  new ApiResponseFailure(
                    err.url,
                    err.message,
                    err.status,
                    new Date(),
                  ),
                );
              },
            });
        },
        error: err => {
          localStorage.removeItem('asat');
          resolve(
            new ApiResponseFailure(
              err.url,
              err.message,
              err.status,
              new Date(),
            ),
          );
        },
      });
    });
  }
}
