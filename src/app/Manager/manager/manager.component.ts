import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
  model,
  signal,
} from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { HeaderTableComponent } from '../../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../shared/components/pop-up/pop-up/pop-up.component';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { UserData } from '../../Employee/employee.component';
import { Options } from 'highcharts';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { INotifications, IUsesrRequestsDetails } from '../../shared/service/interfaces/interfaces';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    SharedUiDesignSystemModule,
    HeaderTableComponent,
    MatTableComponent,
    FormsModule,
    MatSortModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HighchartsChartModule,
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent implements OnInit {
  emp_requests!: IUsesrRequestsDetails[];
  manager_DataSource!: MatTableDataSource<IUsesrRequestsDetails>;
  filterForm!: FormGroup;
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.manager_DataSource && value) {
      this.manager_DataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  selectedFilter: string = '';
  st_date = new Date();
  userDetails!: any;
  projects_List!: any[];

  displayedColumnsRequests: string[] = [
    'emp_id',
    'email',
    'project',
    'requested_date',
    'no_of_days',
    'status',
    'comments',
    'actions',
  ];
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  highChartsOptions!: Options;
  updateFlag: boolean = true; // optional boolean

  constructor(
    private commonService: CommonService,
    private exportexcelservice: ExportExcelService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.filterForm = this.fb.group({
      start: new FormControl(this.st_date, [Validators.required]),
      end: [''],
      requestStatus: [''],
      employeeId: [''],
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getRequestsdetails();
    this.loadChartData();
    this.manager_DataSource = new MatTableDataSource(this.emp_requests);
    this.manager_DataSource.paginator = this.paginator;
    this.manager_DataSource.sort = this.sort;
  }

  // to get the requets
  getRequestsdetails() {
    this.emp_requests = [];
    this.commonService.getRequests().subscribe((res) => {
      this.emp_requests = res;
      this.manager_DataSource = new MatTableDataSource(this.emp_requests);
      this.manager_DataSource.paginator = this.paginator;
      this.manager_DataSource.sort = this.sort;
    });
  }

  clearFilters() {
    this.selectedFilter = '';
    this.filterForm.reset();
    this.manager_DataSource.data = this.emp_requests;
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    // Reset data source to all data when filter type changes
    this.manager_DataSource.data = this.emp_requests;
    this.filterForm.reset();
  }

  applyDateRangeFilter() {
    debugger;
    const value = this.filterForm.value;
    if (value.start && value.end) {
      const filteredData = this.emp_requests.filter((request) => {
        const requestedDate = new Date(request.requested_date);
        return requestedDate >= value.start && requestedDate <= value.end;
      });
      this.manager_DataSource.data = filteredData;
    }
  }

  applyRequestStatusFilter() {
    const requestStatusControl = this.filterForm.get('requestStatus');
    if (requestStatusControl && requestStatusControl.value) {
      const requestStatus = requestStatusControl.value;
      const filteredData = this.emp_requests.filter(
        (request) => request.status === requestStatus
      );
      this.manager_DataSource.data = filteredData;
    }
  }

  applyEmployeeFilter() {
    const employeeId = this.filterForm.get('employeeId')?.value;
    if (employeeId) {
      const filteredData = this.emp_requests.filter((request) =>
        request.emp_id.includes(employeeId)
      );
      this.manager_DataSource.data = filteredData;
    }
  }

  applyFilter() {
    switch (this.selectedFilter) {
      case 'dateRange':
        this.applyDateRangeFilter();
        break;
      case 'requestStatus':
        this.applyRequestStatusFilter();
        break;
      case 'employee':
        this.applyEmployeeFilter();
        break;
    }
  }

  // mat dailog related code
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
    // this.rejectRequest(this.userDetails);
  }

  // to approve request
  approveRequest(request: UserData) {
    request.status = 'approved';
    request.approved_date = new Date().toString();
    this.commonService.updateRequest(request).subscribe((updateRequest) => {
      this.sendNotification(updateRequest, `Your request has been approved.`);
    });
  }

  // to reject request
  rejectRequest(request: UserData) {
    request.status = 'rejected';
    this.commonService.updateRequest(request).subscribe((updateRequest) => {
      this.sendNotification(updateRequest, `Your request has been rejected.`);
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
    if (request.status === 'approved' || request.status === 'rejected') {
      this.notificationService.updateNotification(notification).subscribe();
    } else {
      this.notificationService.createNotification(notification).subscribe();
    }
  }

  public getUserDetails() {
    this.commonService.getUserdetails().subscribe((res) => {
      this.userDetails = res;
    });
  }

  // to get projects list for specific manager
  public getProjects_Manager() {
    this.commonService.getProjects_Manager().subscribe((res) => {
      if (res) {
        this.projects_List = res;
      }
    });
  }

  public loadChartData(): void {
    this.highChartsOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Browser market shares in January, 2018',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          showInLegend: true,
        },
      },
      // legend: {
      //   labelFormatter: function(this: Highcharts.Point): string {
      //     //this.series.data[0].y
      //     return `${this.series.data[0].name}: ${this.series.data[0].y}`;
      //   }
      // },
      series: [
        {
          name: 'Brands',
          type: 'pie',
          data: [
            { name: 'approved', y: 61.41, color: '#38e838' },
            { name: 'Rejected', y: 11.84, color: 'red' },
            { name: 'Created', y: 10.85, color: 'blue' },
          ],
        } as Highcharts.SeriesPieOptions,
      ],
    };
  }
}
