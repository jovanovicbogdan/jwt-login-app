import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import ApiResponseFailure from '../../models/ApiResponseFailure';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent {
  private router = inject(Router);
  private api = inject(ApiService);
  private messageService = inject(MessageService);
  authService = inject(AuthService);
  message = '';

  demo() {
    this.api
      .get<{ message: string }>('http://localhost:8080/api/v1/private/demo')
      .then(res => {
        if (res instanceof ApiResponseFailure) {
          let message = '';
          if (res.statusCode === 401) {
            message = 'Authentication required. Please login again.';
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
          });
          return;
        }

        this.message = res.message;
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to logout. Please try again.',
        });
      },
    });
    // this.router.navigateByUrl('/home');
  }
}
