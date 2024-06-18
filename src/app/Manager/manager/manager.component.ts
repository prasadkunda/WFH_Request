import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
import { IUsesrAllDetals, IUsesrRequestsDetails } from '../../app.component';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { HeaderTableComponent } from '../../shared/components/header-table/header-table/header-table.component';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';

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
        'Project',
        'requested_date',
        'no_of_days',
        'status',
        'comments',
        'actions',
      ];

      constructor(private commonService: CommonService,private exportexcelservice: ExportExcelService) {this.emp_projects = [];}
      ngOnInit(): void {        
        this.getProjectsandEmployeesDetails();
        console.log(this.emp_projects);
        this.dataSource = new MatTableDataSource(this.emp_projects); 
        this.getRequestsdetails();
        this.manager_DataSource = new MatTableDataSource(this.emp_requests) ;
      }
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
      })
    }

}
