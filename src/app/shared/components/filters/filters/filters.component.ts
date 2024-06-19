import { Component, EventEmitter, Output, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { SharedUiDesignSystemModule } from '../../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [SharedUiDesignSystemModule,CommonModule,ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {
  filterForm !: FormGroup;
  statusOptions: string[] = ['created', 'approved', 'rejected'];
  filterOptions: string[] = ['Current Week Requests', 'Request Status', 'Date Range'];
  selectedFilter: string = 'Current Week Requests';

  @Output() filterChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      status: [''],
      startDate: [null],
      endDate: [null]
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.filterChanged.emit(values);
    });

    this.setCurrentWeek();
  }

  onFilterSelectionChange(event: any) {
    this.selectedFilter = event.value;
    if (this.selectedFilter === 'Current Week Requests') {
      this.setCurrentWeek();
    } else {
      this.filterForm.patchValue({ startDate: null, endDate: null });
    }
  }

  setCurrentWeek() {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();
    this.filterForm.patchValue({ startDate: startOfWeek, endDate: endOfWeek });
  }
}
