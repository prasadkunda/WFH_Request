import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
  model,
  signal,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

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
import { Options } from 'highcharts';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonService } from '../shared/service/common.service';
import { PopUpComponent } from '../shared/components/pop-up/pop-up/pop-up.component';
import { UserData } from '../Employee/employee.component';
import { HeaderTableComponent } from '../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../shared/components/mat-table/mat-table/mat-table.component';
import { IUsesrRequestsDetails, INotifications, IInnovationDashboard } from '../shared/service/interfaces/interfaces';
import { NotificationService } from '../shared/service/notification/notification.service';
import { ExportExcelService } from '../shared/utils/export-excel.service';
import { SharedUiDesignSystemModule } from '../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { WorkflowStepperComponent } from '../shared/components/workflow-stepper/workflow-stepper.component';
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
    MatSlideToggleModule
  ],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})

export class ManagerComponent implements OnInit,AfterViewInit {
  emp_requests!: UserData[];
  _parentfilter: boolean = false;
  manager_DataSource!: MatTableDataSource<UserData>;
  filterForm!: FormGroup;
  color = 'accent';
  toggleForm!: FormGroup;
  toggleValue= 'Admin';
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // set paginator(value: MatPaginator) {
  //   if (this.manager_DataSource) {
  //     this.manager_DataSource.paginator = value;
  //   }
  // }
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  selectedFilter: string = '';
  st_date = new Date();
  userDetails!: any;
  projects_List!: any[];
  public modalOpen: boolean = false;
  public dialogRef!: MatDialog;

  displayedColumnsRequests: string[] = [
    'emp_id',
    // 'email',
    'project',
    'requested_date',
    'no_of_days',
    'status',
    'comments',
    'actions',
  ];

  displayedColumnsInnovations: string[] = [
    'title',
    'idea_description',
    'benifits',
    'technology',
    'estimated_effort',
    'status',
    'emp_name'
  ];

  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  highChartsOptions!: Options;
  updateFlag: boolean = true; // optional boolean
  innovationRecords!: IInnovationDashboard[];
  dataSourceInnovations!: MatTableDataSource<IInnovationDashboard>;

  constructor(
    private commonService: CommonService,
    private exportexcelservice: ExportExcelService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private router : Router,
    public dialog: MatDialog
  ) {
    this.dialogRef = dialog;
    this.filterForm = this.fb.group({
      start: new FormControl(this.st_date, [Validators.required]),
      end: [''],
      requestStatus: [''],
      employeeId: [''],
    });
    {
      this.toggleForm = this.fb.group({
        checked : new FormControl('')
      })
    }
  }
  fnToggleAdmin(){
    let isChecked = this.toggleForm.get('checked')?.value;
    if(isChecked === true){
      this.router.navigate(['/admin'])
    }
  }
  
  ngAfterViewInit(): void {
    this.manager_DataSource.paginator = this.paginator;
    this.manager_DataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.getRequestsdetails();
    this.loadChartData();
    this.manager_DataSource = new MatTableDataSource(this.emp_requests);
    this.getInnovations();
    // this.manager_DataSource.paginator = this.paginator;
    // this.manager_DataSource.sort = this.sort;
  }

  // to get the requets
  getRequestsdetails() {
    this.emp_requests = [];
    this.commonService.getRequests().subscribe((res) => {
      if(res && Array.isArray(res)){
        this.emp_requests = res.filter((item)=> item?.approver === 'QE1002'); // assign value from session or local storage
        console.log(this.emp_requests);
        this.manager_DataSource = new MatTableDataSource(this.emp_requests);
        this.manager_DataSource.paginator = this.paginator;
        this.manager_DataSource.sort = this.sort;
      }
     
    });
  }

  clearFilters() {
    this.selectedFilter = '';
    this.filterForm.reset();
    this._parentfilter = false;
    this.manager_DataSource.data = this.emp_requests;
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this._parentfilter = true;
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
  // readonly dialog = inject(MatDialog);

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

  public getInnovations() {
    this.commonService.getInnovations().subscribe((res) => {
      if(res){
        this.innovationRecords = res;
          this.dataSourceInnovations = new MatTableDataSource(this.innovationRecords);
      }
    })
  }

  public openWorkFlowDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(WorkflowStepperComponent, {
          width: '800px',
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
