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
  public dateRangeForm!: FormGroup;
  public dateRangeInvalid: boolean = false;
  @Output() emitRequestForm = new EventEmitter<any>();
  // readonly dialogRef = inject(MatDialogRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly FormData = model(this.dateRangeForm);

  constructor(private fb: FormBuilder,@Inject(MatDialogRef) public dialogRef: MatDialogRef<any>) {
    console.log();
    this.dateRangeForm = new FormGroup(
      {
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        comments: new FormControl('', [Validators.required]),
      },
      { validators: this.dateRangeValidator }
    );
  }

  ngOnInit(): void {}

  dateRangeValidator: ValidatorFn = (
    group: AbstractControl
  ): { [key: string]: any } | null => {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (start && end) {
      const diff = moment(end).diff(moment(start), 'days');
      if (diff < 0 || diff > 5) {
        return { dateRangeInvalid: true };
      }
    }
    return null;
  };

  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return date >= today && date <= maxDate;
  };

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const startDate = this.dateRangeForm.get('startDate')?.value;
    const endDate = this.dateRangeForm.get('endDate')?.value;
    if (startDate && endDate) {
      this.dateRangeForm.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.dateRangeForm.valid) {
      this.emitRequestForm.emit(this.dateRangeForm.value);
      this.dialogRef.close(this.dateRangeForm.value); // Emit close event
      this.dateRangeForm.reset();
    }
  }

}
