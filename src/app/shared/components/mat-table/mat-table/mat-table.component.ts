import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [SharedUiDesignSystemModule,CommonModule],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss'
})
export class MatTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource && value){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort) sort!: MatSort;

constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    if(this.dataSource?.paginator){
      this.dataSource.paginator = this.paginator;
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

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
