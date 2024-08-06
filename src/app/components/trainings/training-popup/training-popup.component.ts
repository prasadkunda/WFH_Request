import { Component, EventEmitter, Inject, Input, OnInit, Output, inject, model } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import moment from 'moment';

@Component({
  selector: 'app-training-popup',
  standalone: true,
  imports: [MatDialogModule,MatIconModule,FormsModule, ReactiveFormsModule,MatFormFieldModule,MatDatepickerModule,MatSelectModule,MatInputModule],
  templateUrl: './training-popup.component.html',
  styleUrl: './training-popup.component.scss'
})
export class TrainingPopupComponent  implements OnInit {
  @Input() id!: string;
  @Output() close = new EventEmitter<void>();
  public trainingForm!: FormGroup;
  public innovationInvalid: boolean = false;
  @Output() emitRequestForm = new EventEmitter<any>();
  // readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly FormData = model(this.trainingForm);

  constructor(private fb: FormBuilder,@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>) {
    console.log();
    this.trainingForm = new FormGroup(
      {
        empid: new FormControl('', [Validators.required])
        // description: new FormControl('', [Validators.required]),
        // benifits: new FormControl('', [Validators.required]),
        // technology: new FormControl('', [Validators.required]),
        // estimatedefforts: new FormControl('', [Validators.required]),
      },
      // { validators: this.dateRangeValidator }
    );
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.trainingForm.valid) {
      this.emitRequestForm.emit(this.trainingForm.value);
      this.dialogRef.close(this.trainingForm.value); // Emit close event
      this.trainingForm.reset();
    }
  }

}
