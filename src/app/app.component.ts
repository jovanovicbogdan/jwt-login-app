import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.loggedInUser.set(null);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authService.loggedInUser.set(null);
    this.router.navigateByUrl('/home');
  }
}
