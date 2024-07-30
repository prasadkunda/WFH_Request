import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportExcelService } from '../../../utils/export-excel.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [SharedUiDesignSystemModule, CommonModule, MatIconModule],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
})

export class MatTableComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;
  @Output() filterChanged = new EventEmitter<any>();
  @Input() displayedColumns!: string[];
  @Input() searchedValue!: string;
  @Input() title: string = 'Total Request';
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource && value) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort) set sort(sort: MatSort) {
    if (this.dataSource?.sort && sort) {
      this.dataSource.sort = sort;
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private exportexcelservice: ExportExcelService
  ) {}

  ngOnInit() {
    if (this.dataSource?.paginator && this.dataSource.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    }
  }

  public getStatusClass(status: string): string {
    console.log();
    switch (status.toLowerCase()) {
      case 'approved':
        return 'badge badge-success';
      case 'rejected':
        return 'badge badge-danger';
      case 'created':
        return 'badge badge-info';
      default:
        return '';
    }
  }

  public capitalize(s: string): string {
    s = s.replace(/_/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exporttableToExcel() {
    this.exportexcelservice.exportToExcel(this.dataSource.data, this.title);
  }

  // public onSearchChange(event: Event) {
  //   // const input = event.target as HTMLInputElement;
  //   // this.onSearchChange.emit(input.value);

  // }
  public onClickFilter(event: any): void {}
}
