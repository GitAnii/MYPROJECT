import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

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
  
  
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService) {

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

     
          localStorage.setItem('isLoggedIn', 'true');  
          localStorage.setItem('username', user.username);  

           this.loginService.isLogin.set(true);
           
          this.router.navigate(['/home']);
        } else {
          console.log('Invalid credentials');

        }
      }, error => {
        console.error('Error fetching users:', error);

      });
    } else {
      console.log('Please fill in all fields');
    }
  }
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
