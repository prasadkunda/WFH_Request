import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnFilter } from '../../../shared/service/interfaces/interfaces';
import { DateFilter } from './date-filter.model';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [ReactiveFormsModule,MatDialogRef],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss'
})

export class DateFilterComponent implements OnInit{

  model!: DateFilter;

  displayName!: any;

  public constructor(
      private readonly dialogRef: MatDialogRef<DateFilterComponent>,
      @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter) { }

  ngOnInit() {
      this.displayName = this.filterData.column.displayName;
      this.model = this.filterData.filter || new DateFilter(this.filterData.column.name);
  }

  apply() {
      if (this.model.fromDate || this.model.toDate) {
          this.dialogRef.close(this.model);
      } else {
          this.dialogRef.close('');
      }
  }


}
