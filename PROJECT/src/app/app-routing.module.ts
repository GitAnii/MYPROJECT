import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomeComponent} from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  {path: 'favorite', component:FavoriteComponent},
  {path: 'game/:id', component:GamepageComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
