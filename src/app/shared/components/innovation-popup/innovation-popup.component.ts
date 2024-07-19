import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, inject, model } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { SharedUiDesignSystemModule } from '../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';

@Component({
  selector: 'app-innovation-popup',
  standalone: true,
  imports: [ReactiveFormsModule,
    SharedUiDesignSystemModule,
    CommonModule,
    MatDialogModule,],
  templateUrl: './innovation-popup.component.html',
  styleUrl: './innovation-popup.component.scss'
})
export class InnovationPopupComponent implements OnInit {
  @Input() id!: string;
  @Output() close = new EventEmitter<void>();
  public innovationForm!: FormGroup;
  public innovationInvalid: boolean = false;
  @Output() emitRequestForm = new EventEmitter<any>();
  // readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly FormData = model(this.innovationForm);

  constructor(private fb: FormBuilder,@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>) {
    console.log();
    this.innovationForm = new FormGroup(
      {
        requesttype: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        benifits: new FormControl('', [Validators.required]),
        technology: new FormControl('', [Validators.required]),
        estimatedefforts: new FormControl('', [Validators.required]),
      },
      // { validators: this.dateRangeValidator }
    );
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.innovationForm.valid) {
      this.emitRequestForm.emit(this.innovationForm.value);
      this.dialogRef.close(this.innovationForm.value); // Emit close event
      this.innovationForm.reset();
    }
  }

}
