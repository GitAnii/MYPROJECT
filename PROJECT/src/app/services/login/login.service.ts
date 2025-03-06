import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 public isLogin = signal(false);
  constructor() { }
}
