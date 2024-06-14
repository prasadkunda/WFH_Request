import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonService } from '../../shared/service/common.service';
import { Observable } from 'rxjs';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
export interface UserData {
  // sl_no: string;
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
    MatRippleModule,
    MatTooltipModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  cardDetails!: cardData[];
  users!: UserData[];
  dataSource!: MatTableDataSource<UserData>;
  headerTitle: string = 'Total Request ';

  displayedColumns: string[] = [
    // 'sl_no',
    'project',
    'requested_date',
    'approved_date',
    'approver',
    'status',
    'comments',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private commonService: CommonService) {}

  public ngOnInit(): void {
    this.commonService.getAllRequest().subscribe((res) => {
      if (res && Array.isArray(res)) {
        this.users = res;
        if (res && Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    });
    this.getCardDetails();
  }

  // ngAfterViewInit() {}

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
        } else {
        }
      } catch {
        console.error('Unexpected response :', res);
      }
    });
  }

  // used to get title and index of the card
  public onCardClick(index: number, title: string) {
    this.headerTitle = title;
    this.dataSource = new MatTableDataSource();
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
    let arrayBadge: string;
    requestObservable.subscribe((res) => {
      try {
        if (res && Array.isArray(res)) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      } catch {
        console.error('Error in API Response', res);
      }
    });
  }
  public capitalize(s: string): string {
    s = s.replace(/_/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
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
}
