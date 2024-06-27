import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonService } from '../../shared/service/common.service';
import { Observable } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { HeaderTableComponent } from '../../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';
import { IUserDetails } from '../../app.component';


export interface UserData {
  id: any;
  emp_id: string;
  project: any;
  requested_date: string;
  approved_date: string;
  approver: string;
  status: string;
  comments: string;
}
export interface cardData {
  icon: string;
  title: string;
  number: number;
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
    HeaderTableComponent,
    MatTableComponent,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
  
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  cardDetails!: cardData[];
  users!: UserData[];
  dataSource!: MatTableDataSource<UserData>;
  userId !: string;

  headerTitle: string = 'Total Request';
  public activeCardId: number | null = null;
  sidebarExpanded = true;
  userDetails!: IUserDetails[];

  displayedColumns = [
    'project',
    'requested_date',
    'approved_date',
    'approver',
    'status',
    'comments',
    'actions',
  ];

  constructor(
    private commonService: CommonService,
    private exportexcelservice: ExportExcelService
  ) {}

  public ngOnInit(): void {
    this.getUserDetails();
    this.userId = this.userDetails[0]?.emp_id;
    this.commonService.getAllRequest().subscribe((res) => {
      if (res && Array.isArray(res)) {
        this.users = res.filter(item => item.emp_id === this.userId);
        // console.log('emp_id based data',this.users);
        // this.users = res;
        if (res) {
          this.dataSource = new MatTableDataSource(this.users);
        }
      }
    });
    this.getCardDetails();
  }

  public ngAfterViewInit() {
    
  }

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
      case 'New':
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
          this.users = res.filter(item => item.emp_id === this.userId)
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
      this.userDetails = res;
    });
  }
}
