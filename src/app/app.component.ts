import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigateByUrl('/home');
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
  }
}
