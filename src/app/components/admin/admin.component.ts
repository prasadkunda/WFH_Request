import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule,MatSlideToggleModule,CommingsoonComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  toggleForm: FormGroup;
  color = 'accent';
  constructor(private fb: FormBuilder,private router: Router){
    this.toggleForm = this.fb.group({
      checked : new FormControl('')
    })
  }

  fnToggleAdmin(){
    this.router.navigate(['/manager'])
  }
}
