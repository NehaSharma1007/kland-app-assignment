import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = null;
    const { email, password } = this.loginForm.value;

    // MOCK LOGIN LOGIC - Only allow specific credentials
    if (email === 'eddy@yopmail.com' && password === '123123') {
      // Simulate API response for the correct user
      const mockUser = {
        firstName: 'Eddy',
        lastName: 'Yopmail',
        email: 'eddy@yopmail.com',
        phoneCode: '965',
        phone: '12345678'
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/account']);
      }, 500); // Simulate network delay
    } else {
      // For any other credentials, show an error
      setTimeout(() => {
        this.error = '401 Unauthorized #1';
        this.loading = false;
      }, 500);
    }
    return;
    // END MOCK LOGIN LOGIC

    // The real API call is commented out for demo purposes
    /*
    const body = {
      email: email,
      phone: '',
      phoneCode: '965',
      password: password,
      deviceToken: '',
      deviceType: '',
      deviceModel: '',
      appVersion: '',
      osVersion: ''
    };
    const headers = new HttpHeaders({
      'Authorization': 'dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=s',
      'Content-Type': 'application/json'
    });
    this.http.post<any>('https://dev-api.wanasti.com/api/v1/user/login?lang=en&currencyCode=KW', body, { headers })
      .subscribe({
        next: (res) => {
          // Store user data and navigate
          localStorage.setItem('user', JSON.stringify(res.data));
          this.router.navigate(['/account']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    */
  }
}
