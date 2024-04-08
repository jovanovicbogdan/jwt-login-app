import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  authService = inject(AuthService);
  showLoggedInUserWarning = false;

  ngOnInit() {
    if (!this.authService.loggedInUser()) {
      this.showLoggedInUserWarning = true;
    } else {
      this.showLoggedInUserWarning = false;
    }
  }
}
