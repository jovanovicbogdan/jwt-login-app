import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.http
      .post(
        'http://localhost:8080/api/v1/auth/register',
        {
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        },
        { observe: 'response' },
      )
      .subscribe(res => {
        if (res.status === HttpStatusCode.Created) {
          alert('Registration successful');
          this.router.navigateByUrl('/login');
        }
      });
  }
}
