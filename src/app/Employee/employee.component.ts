import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, formatDate } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { CommonService } from '../shared/service/common.service';
import { ExportExcelService } from '../shared/utils/export-excel.service';
import { MatTableComponent } from '../shared/components/mat-table/mat-table/mat-table.component';
import { PopOverComponent } from '../shared/components/pop-over/pop-over.component';
import { NotificationService } from '../shared/service/notification/notification.service';
import { INotifications, IUserDetails } from '../shared/service/interfaces/interfaces';

export interface UserData {
  id: any;
  emp_id: string;
  project: any;
  requested_date: string;
  approved_date: string;
  approver: string;
  status: string;
  comments: string;
  request_type: string;
}
export interface cardData {
  icon: string;
  title: string;
  number: number;
  backgroundcolor:string
}
export interface Request {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  cardDetails!: cardData[];
  users!: UserData[];
  dataSource!: MatTableDataSource<UserData>;
  userId!: string;

  headerTitle: string = 'Total Request';
  public activeCardId: number | null = null;
  sidebarExpanded = true;
  userDetails!: IUserDetails[];
  public dialogRef!: MatDialog;
  public modalOpen: boolean = false;
  // valid_screen !: boolean;
  displayedColumns = [
    'project',
    'requested_date',
    'request_type',
    'approved_date',
    'approver',
    'status',
    'comments',
    'actions',
  ];

  constructor(
    private commonService: CommonService,
    private exportexcelservice: ExportExcelService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }

  public ngOnInit(): void {
    // this.valid_screen = true;
    this.getUserDetails();
    this.commonService.getAllRequest().subscribe((res) => {
      if (res && Array.isArray(res)) {
        this.users = res.filter((item) => item.emp_id === this.userId);
        // console.log('emp_id based data',this.users);
        // this.users = res;
        // if (res) {
          this.dataSource = new MatTableDataSource(this.users);
        // }
      }
    });
    this.getCardDetails();
  }

  public ngAfterViewInit() {}

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getCardDetails() {
    this.cardDetails = [];
    this.commonService.getCardsDetails().subscribe((res) => {
      try {
        if (res && Array.isArray(res)) {
          this.cardDetails = res;
          // console.log(res);
        } else {
        }
      } catch {
        console.error('Unexpected response :', res);
      }
    });
  }

  // used to get title and index of the card
  public onCardClick(index: number, title: string) {
    this.activeCardId = index;
    this.headerTitle = title;
    this.dataSource = new MatTableDataSource<UserData>();
    let requestObservable;
    switch (title) {
      case 'Approved':
        requestObservable = this.commonService.getApprovedRequest();
        break;
      case 'Rejected':
        requestObservable = this.commonService.getRejectedRequest();
        break;
      case 'New Request':
        requestObservable = this.commonService.getNewRequest();
        break;
      default:
        requestObservable = this.commonService.getAllRequest();
        break;
    }
    this.handleRequest(requestObservable);
  }

  public handleRequest(requestObservable: Observable<any>) {
    requestObservable.subscribe((res) => {
      try {
        if (res && Array.isArray(res)) {
          this.users = res.filter((item) => item.emp_id === this.userId);
          this.dataSource = new MatTableDataSource(this.users);
        }
      } catch {
        console.error('Error in API Response', res);
      }
    });
  }

  public getStatusClass(status: string): string {
    // console.log();
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

  exporttableToExcel() {
    this.exportexcelservice.exportToExcel(
      this.dataSource.data,
      this.headerTitle
    );
  }

  public setActiveCard(cardId: number) {
    this.activeCardId = cardId;
  }

  public getBorderStyle(card: any) {
    return {
      'border-left': card.color ? `5px solid ${card.color}` : '5px solid blue',
    };
  }

  getUserDetails() {
    this.commonService.getUserdetails().subscribe((res) => {
      if (res) {
        this.userDetails = res;
        console.log("User details",this.userDetails);
        this.userId = this.userDetails[0]?.emp_id;
      }
    });
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(PopOverComponent, {
          width: '600px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'WFH Request-modal',
          hasBackdrop: true,
        })
        .afterClosed()
        .subscribe((result: any) => {
          console.log('The dialog was closed',result);
          if (result) {
            console.log('Form data:', result);
            this.saveWFHR(result);
          }
        });
    }
    this.modalOpen = true;
  }

  public saveWFHR(data: any) {
    console.log(data)
    if(data != true || data != false){
    const payload: any = {
      sl_no: '',
      emp_id: this.userDetails[0]?.emp_id,
      project: this.userDetails[0]?.Project,
      requested_date: formatDate(data.startDate, 'MM/dd/yyyy', 'en'),
      approved_date: '',
      approver: '',
      status: 'Created',
      comments: data.comments,
      id: '',
    };
    this.commonService.addItem(payload).subscribe((res:any) => {
      const notificationPayload: INotifications = {
        id:'1',
        emp_id: this.userDetails[0]?.emp_id,
        message: `New WFH request has been raised by ${this.userDetails[0]?.emp_id} `,
        read: false,
        project:this.userDetails[0]?.Project,
        approver:'QE1002',
      };
      this.notificationService.createNotification(notificationPayload).subscribe();
    });
    }
  }
}
