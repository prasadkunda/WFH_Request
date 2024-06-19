import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
import { IUsesrAllDetals, IUsesrRequestsDetails } from '../../app.component';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { HeaderTableComponent } from '../../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';
import moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [SharedUiDesignSystemModule,
    HeaderTableComponent,
    MatTableComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
      emp_projects !: IUsesrAllDetals[];
      emp_requests !: IUsesrRequestsDetails[];
      dataSource!: MatTableDataSource<IUsesrAllDetals>;
      manager_DataSource!: MatTableDataSource<IUsesrRequestsDetails>;
      filterForm !: FormGroup;
      @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource && value){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort) sort!: MatSort;
      
      displayedColumns: string[] = [
        'emp_id',
        'emp_fname',
        'email',
        'desiganation',
        'Project',
      ];

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
          this.emp_projects = [];
        this.filterForm = this.fb.group({
          status: [''],
          startDate: [''],
          endDate: ['']
        });
      }

      ngOnInit(): void {        
        this.getProjectsandEmployeesDetails();
        this.dataSource = new MatTableDataSource(this.emp_projects);
        this.getRequestsdetails();
        this.manager_DataSource = new MatTableDataSource(this.emp_requests) ;
        this.filterRequests();
        this.filterForm.valueChanges.subscribe(filters => {
          this.filterRequests(filters);
        });
      }

      // ngAfterViewInit() {
      //   this.dataSource.paginator = this.paginator;
      //   this.cdr.detectChanges(); 
      // }

// get employees and projects lists
    getProjectsandEmployeesDetails() {
      this.emp_projects = [];
        this.commonService.getEmployeesandProjects().subscribe(res => {
          this.emp_projects = res;          
        })
      
    }

    public applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    exporttableToExcel() {
      this.exportexcelservice.exportToExcel(
        this.dataSource.data,
        'Employee details'
      );
    }
// to get the requets
    getRequestsdetails() {
      this.emp_requests = [];
      this.commonService.getRequests().subscribe(res => {
        this.emp_requests = res;
        this.manager_DataSource = new MatTableDataSource(this.emp_requests);         
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;         
      })
    }

    onFilterChanged(filters: any) {
      this.filterRequests(filters);
    }
  
    filterRequests(filters: any = {}) {
      const filteredData = this.emp_requests.filter(request => {
        const requestDate = moment(request.requested_date, 'DD-MM-YYYY');
        const startDate = filters.startDate ? moment(filters.startDate) : null;
        const endDate = filters.endDate ? moment(filters.endDate) : null;
  
        return (
          (!filters.status || request.status === filters.status) &&
          (!startDate || requestDate.isSameOrAfter(startDate, 'day')) &&
          (!endDate || requestDate.isSameOrBefore(endDate, 'day'))
        );
      });
  
      this.manager_DataSource.data = filteredData;
    }

    clearFilters() {
      this.filterForm.reset();
      this.dataSource.data = [];
      // this.paginator.firstPage();
    }

}
