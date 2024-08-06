import { Component, Inject } from '@angular/core';
import { TextFilter } from '../text-filter/text-filter.model';
// import { ColumnFilter } from 'material-dynamic-table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnFilter } from '../../../../service/interfaces/interfaces';

@Component({
  selector: 'app-text-filter',
  standalone: true,
  imports: [],
  templateUrl: './text-filter.component.html',
  styleUrl: './text-filter.component.scss'
})
export class TextFilterComponent {
  model!: TextFilter;

  displayName!: string;

  public constructor(
      private readonly dialogRef: MatDialogRef<TextFilterComponent>,
      @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter) { }

  ngOnInit() {
      this.displayName = this.filterData.column.displayName;
      this.model = this.filterData.filter || new TextFilter(this.filterData.column.name);
  }

  apply() {
      if (this.model.value) {
          this.dialogRef.close(this.model);
      } else {
          this.dialogRef.close('');
      }
  }
}
