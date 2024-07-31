import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../../utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportExcelService } from '../../../utils/export-excel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowStepperComponent } from '../../workflow-stepper/workflow-stepper.component';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [SharedUiDesignSystemModule, CommonModule, MatIconModule],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
})

export class MatTableComponent implements OnInit {
  public modalOpen: boolean = false;
  public dialogRef!: MatDialog;
  @Input() valid_screen: boolean = false;
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

  @ViewChild(MatSort) set sort(value: MatSort) {
    if (this.dataSource?.sort && value) {
      this.dataSource.sort = value;
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private exportexcelservice: ExportExcelService,
    public dialog: MatDialog
  ) {  this.dialogRef = dialog; }

  ngOnInit() {
    if (this.dataSource?.paginator && this.dataSource.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(WorkflowStepperComponent, {
          width: '648px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'Innovation Request-modal',
          hasBackdrop: true,
        })
        .afterClosed()
        .subscribe((result: any) => {
          // console.log('The dialog was closed');
          // if (result) {
          //   console.log('Form data:', result);
          //   this.generateRandomNumbers();
          //   this.saveinnvations(result);
          // }
        });
    }
    this.modalOpen = true;
  }

}
