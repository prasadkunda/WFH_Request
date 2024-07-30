import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnFilter } from '../../../shared/service/interfaces/interfaces';
import { TextFilter } from './text-filter.model';

@Component({
  selector: 'app-text-filters',
  standalone: true,
  imports: [],
  templateUrl: './text-filters.component.html',
  styleUrl: './text-filters.component.scss',
})
export class TextFiltersComponent {
  model!: TextFilter;

  displayName!: string;

  public constructor(
    private readonly dialogRef: MatDialogRef<TextFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter
  ) {}

  ngOnInit() {
    this.displayName = this.filterData.column.displayName;
    this.model =
      this.filterData.filter || new TextFilter(this.filterData.column.name);
  }

  apply() {
    if (this.model.value) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
