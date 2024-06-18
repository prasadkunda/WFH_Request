import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { SharedUiDesignSystemModule } from '../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';

@Component({
  selector: 'app-pop-over',
  standalone: true,
  imports: [ReactiveFormsModule, SharedUiDesignSystemModule, CommonModule],
  templateUrl: './pop-over.component.html',
  styleUrl: './pop-over.component.scss',
  providers: [],
})
export class PopOverComponent {
  @Input() id!: string;
  @Output() close = new EventEmitter<void>();
  public dateRangeForm: FormGroup;
  public dateRangeInvalid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.dateRangeForm = new FormGroup(
      {
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
        comments: new FormControl('', [Validators.required])
      },
      { validators: this.dateRangeValidator }
    );
  }

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
      console.log('Form Submitted', this.dateRangeForm.value);
      this.dateRangeForm.reset();
      this.close.emit(); // Emit close event
    }
  }

  
}
