import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  searchTerm : string ='';
  title = 'PROJECT';
  
  showFooter: boolean = true;
  authService: any;

  constructor(private router: Router, authService: AuthService) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showFooter = !(currentRoute === '/login' || currentRoute === '/register');
    });
  }
  ngOnInit() {
    this.authService.checkLoginStatus();
  }
onSearch(searchTermn:string):void{
this.searchTerm = searchTermn;
}
}