import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-workflow-stepper',
  standalone: true,
  imports: [MatStepperModule,  FormsModule, ReactiveFormsModule,MatDialogModule,MatIconModule],
  templateUrl: './workflow-stepper.component.html',
  styleUrl: './workflow-stepper.component.scss'
})
export class WorkflowStepperComponent {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
