import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
import { IUsesrRequestsDetails } from '../../app.component';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { HeaderTableComponent } from '../../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [SharedUiDesignSystemModule,
    HeaderTableComponent,
    MatTableComponent,
    FormsModule,
  CommonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
      emp_requests !: IUsesrRequestsDetails[];
      manager_DataSource!: MatTableDataSource<IUsesrRequestsDetails>;
      filterForm !: FormGroup;
      @ViewChild(MatPaginator, {static: false})
      set paginator(value: MatPaginator) {
      if (this.manager_DataSource && value){
        this.manager_DataSource.paginator = value;
      }
  }
  @ViewChild(MatSort) sort!: MatSort;

  selectedFilter: string = '';
  st_date = new Date();
      displayedColumnsRequests: string[] = [
        'emp_id',
        'email',
        'project',
        'requested_date',
        'no_of_days',
        'status',
        'comments',
      ];

      constructor(private commonService: CommonService,private exportexcelservice: ExportExcelService,
        private fb: FormBuilder,private cdr: ChangeDetectorRef) {
        this.filterForm = this.fb.group({
          start: new FormControl(this.st_date,[Validators.required]),
          end: [''],
          requestStatus: [''],
          employeeId: [''],
        });
        
      }

      ngOnInit(): void {  
        this.getRequestsdetails();
        this.manager_DataSource = new MatTableDataSource(this.emp_requests) ;
        this.manager_DataSource.paginator = this.paginator;
        this.manager_DataSource.sort = this.sort;
      }

    // to get the requets
    getRequestsdetails() {
      this.emp_requests = [];
      this.commonService.getRequests().subscribe(res => {
        this.emp_requests = res;
        this.manager_DataSource = new MatTableDataSource(this.emp_requests);         
        this.manager_DataSource.paginator = this.paginator;
        this.manager_DataSource.sort = this.sort;         
      })
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
      const value = this.filterForm.value
    if (value.start && value.end) {
      const filteredData = this.emp_requests.filter(request => {
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
        const filteredData = this.emp_requests.filter(request => request.status === requestStatus);
        this.manager_DataSource.data = filteredData;
      }
    }
  
    applyEmployeeFilter() {
      const employeeId = this.filterForm.get('employeeId')?.value;
      if (employeeId) {
        const filteredData = this.emp_requests.filter(request => request.emp_id.includes(employeeId));
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
}
