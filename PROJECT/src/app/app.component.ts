import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchTerm : string ='';
  title = 'PROJECT';
  
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showFooter = !(currentRoute === '/login' || currentRoute === '/register');
    });
  }
onSearch(searchTermn:string):void{
this.searchTerm = searchTermn;
}
}