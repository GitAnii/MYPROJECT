import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{HomeComponent} from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  {path: 'favorite', component:FavoriteComponent,canActivate: [AuthGuard]},
  { path: 'game/:id', component: GamepageComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
