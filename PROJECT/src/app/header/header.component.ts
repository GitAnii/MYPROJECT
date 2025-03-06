import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})                           
export class HeaderComponent implements OnInit{ 
isLoggedIn: boolean = false;
username:string |null='';

constructor(private router:Router){}

ngOnInit(): void{
  this.updateLoginStatus();
}
updateLoginStatus() {
  this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  this.username = localStorage.getItem('username');
}
logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  this.isLoggedIn = false;
  this.username = '';
  this.router.navigate(['/login']);
}
}
