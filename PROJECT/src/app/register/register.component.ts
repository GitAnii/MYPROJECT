import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {



registerForm:FormGroup;

constructor(private fb:FormBuilder, private http: HttpClient,private router: Router ){
  this.registerForm = this.fb.group({
    username :['',[Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],
  });
}

onSubmit(){
  if(this.registerForm.valid){

    this.http.post('http://localhost:3000/users', this.registerForm.value).subscribe(response =>{
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    });


  }else{
    console.log('Form is not valid')
  }
}
}
