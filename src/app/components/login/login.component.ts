import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.http
      .post<{ data: { authToken: string } }>(
        'http://localhost:8080/api/v1/auth/login',
        {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        },
        { observe: 'response' },
      )
      .subscribe(res => {
        if (res.status === HttpStatusCode.Ok) {
          localStorage.setItem('authToken', res.body?.data.authToken as string);
          this.authService.loggedInUser.set({
            username: this.loginForm.value.username as string,
            authToken: res.body?.data.authToken as string,
          });
          this.router.navigateByUrl('/');
        }
      });
  }
}
