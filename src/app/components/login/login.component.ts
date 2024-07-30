import { Component, OnInit, signal } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatSelectModule,FlexLayoutModule,MatInputModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  errorMessage = {
    email: signal(''),
    password: signal('')
  };
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  fnLogin(){
    console.log(this.loginForm.value);
    
  }

  fnUpdateErrorMessage(){

  if(this.loginForm.get('email')?.hasError('required')){
    this.errorMessage.email.set('You must enter a value');
  }else if(this.loginForm.get('email')?.hasError('email')){
    this.errorMessage.email.set('Not a valid email');
  }else{
    this.errorMessage.email.set('');
  }

   
  if(this.loginForm.get('password')?.hasError('required')){
    this.errorMessage.password.set('You must enter a value');
  }else{
    this.errorMessage.password.set('')
  }

  }
}
