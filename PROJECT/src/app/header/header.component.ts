import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})                           
export class HeaderComponent implements OnInit{ 

username:string |null='';

constructor(private router:Router, public loginServ:LoginService ){}

ngOnInit(): void{
  this.updateLoginStatus();
}
updateLoginStatus() {
this.loginServ.isLogin.set(localStorage.getItem('isLoggedIn') ==='true')
  this.username = localStorage.getItem('username');
}
logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  this.loginServ.isLogin.set(false);
  this.username = '';
  this.router.navigate(['/login']);
}
}
