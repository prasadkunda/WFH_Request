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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ExportExcelService } from '../../../utils/export-excel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WorkflowStepperComponent } from '../../workflow-stepper/workflow-stepper.component';
import { INotifications, IUserDetails, UserData } from '../../../service/interfaces/interfaces';
import { CommonService } from '../../../service/common.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [SharedUiDesignSystemModule, CommonModule, MatIconModule,MatSortModule],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss',
})
export class MatTableComponent implements OnInit {
  public modalOpen: boolean = false;
  public dialogRef!: MatDialog;
  @Input() valid_screen: boolean = false;
  @Input() myInnovationFlag!: boolean;
  @Input() dataSource!: MatTableDataSource<any>;
  @Output() filterChanged = new EventEmitter<any>();
  @Input() displayedColumns!: string[];
  @Input() searchedValue!: string;
  @Input() title: string = 'Total Request';
  @Input() role:string = ''
  public userDetails!: IUserDetails[];
  public params: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
    private exportexcelservice: ExportExcelService,
    public dialog: MatDialog,
    private notificationService: NotificationService,){   
    this.dialogRef = dialog;
  }

  ngOnInit() {
    // console.log('myInnvationFlag', this.myInnovationFlag);
    this.commonService.getUserdetails().subscribe((response) => {
      this.userDetails = response;
    });
    if (this.dataSource?.paginator && this.dataSource.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        case 'cancelled':
          return 'badge badge-danger';
        case 'completed':
          return 'badge badge-success';
        case 'inprogress':
          return 'badge badge-dark';
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
  public onClickFilter(event: any): void {

  }

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

  public filterMyInnovations(): void {
    // console.log('this.dataSource', this.dataSource);
    if (this.dataSource) {
      this.dataSource.data = this.dataSource.data.filter(
        (item) => item.emp_id === this.userDetails[0].emp_id
      );
      console.log('this.dataSource', this.dataSource);
    }
  }
  
  approveRequest(request:any){
    request.status = 'inprogress';
    request.approved_date = new Date().toString();
    this.commonService.updateInnovationRequest(request).subscribe((updateRequest) => {
      this.sendNotification(updateRequest, `Your innovation has been approved by BU Head`);
    });
  }

  rejectRequest(request:any){
    request.status = 'rejected';
    this.commonService.updateInnovationRejectRequest(request).subscribe((updateRequest) => {
      this.sendNotification(updateRequest, `Your innovation has been rejected by BU Head`);
    },error=>{
      console.log(error);
    });
  }

  // to send the status request
  private sendNotification(request: UserData, message: string) {
    const notification: INotifications = {
      id: '1',
      emp_id: request?.emp_id,
      message: message,
      read: false,
      project: request?.project,
      approver: 'QE1002',
    };
    if (request.status === 'inprogress' || request.status === 'rejected') {
      this.notificationService.updateNotification(notification).subscribe();
    } else {
      this.notificationService.createNotification(notification).subscribe();
    }
  }
}
