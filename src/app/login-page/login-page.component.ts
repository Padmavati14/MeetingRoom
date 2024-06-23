import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  model = {
    username: '',
    password: ''
  };
  loginFailed : boolean = false;


  constructor(private router: Router) { }

  onSubmit() {
    const { username, password } = this.model;
    if (username != '' && password != '') {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }

  login(username: string, password: string): boolean {
    // Mock authentication logic
    if (username === 'ANY USERNAME' && password === 'Password123') {
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
