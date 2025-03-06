import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  loginEmail: string = '';
  loginPassword: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginEmail && this.loginPassword) {
  
      const credentials = {
        email:this.loginEmail,
        password: this.loginPassword
      }

      this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (user) {
          console.log('Login successful', user);

          // Store the username and login status in localStorage
          localStorage.setItem('isLoggedIn', 'true');  // Mark as logged in
          localStorage.setItem('username', user.username);  // Store username

          // Navigate to the home page after successful login
          this.router.navigate(['/home']);
        } else {
          console.log('Invalid credentials');
          // Optionally, show an error message
        }
      }, error => {
        console.error('Error fetching users:', error);
        // Optionally, handle the error here
      });
    } else {
      console.log('Please fill in all fields');
    }
  }
}
