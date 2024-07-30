import { Component, EventEmitter, model, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';

export interface IRequest {
  name: string;
}

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,ReactiveFormsModule,
    SharedUiDesignSystemModule,
    CommonModule,
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})
export class RequestComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public avaliableRequests: IRequest[] = [
    { name: 'Innovation' },
    { name: 'WFH' },
    { name: 'Facility' },
    { name: 'Operation' }
  ];

  @Output() close = new EventEmitter<void>();
  public dateRangeForm!: FormGroup;
  public dateRangeInvalid: boolean = false;
  @Output() emitRequestForm = new EventEmitter<any>();
  // readonly dialogRef = inject(MatDialogRef);
  // readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly FormData = model(this.dateRangeForm);

  constructor(private fb: FormBuilder){
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
 
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    // this.avaliableRequests.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.avaliableRequests.length - 1);
    }
  }

  // removeTab(index: number) {
  //   this.tabs.splice(index, 1);
  // }

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
    // if (this.dateRangeForm.valid) {
    //   this.emitRequestForm.emit(this.dateRangeForm.value);
    //   this.dialogRef.close(this.dateRangeForm.value); // Emit close event
    //   this.dateRangeForm.reset();
    // }
  }

}
