import { HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import UserModel from '../../models/UserModel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: res => {
          if (res.status === HttpStatusCode.Ok) {
            const user = res.body?.data as UserModel;
            localStorage.setItem('asat', user.authToken);
            this.router.navigateByUrl('/home');
          }
        },
        error: err => {
          if (err.status === HttpStatusCode.Unauthorized) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.data.message,
            });
          }
        },
      });
  }
}
