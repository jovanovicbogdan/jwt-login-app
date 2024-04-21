import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import ApiResponseFailure from '../../models/ApiResponseFailure';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ManageCustomerComponent } from '../manage-customer/manage-customer.component';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MenuBarComponent,
    ButtonModule,
    ToastModule,
    HeaderBarComponent,
    SidebarModule,
    ManageCustomerComponent,
    CustomerCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private api = inject(ApiService);
  private messageService = inject(MessageService);
  authService = inject(AuthService);
  message = '';
  sidebarVisible = false;
  users: UserModel[] = [];

  ngOnInit() {
    this.api.get<any[]>('http://localhost:8080/api/v1/users').then(res => {
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

      this.users = res;
    });
  }

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

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  closeSidebar() {
    this.sidebarVisible = false;
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
