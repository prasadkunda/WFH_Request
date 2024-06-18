import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/service/common.service';
import { IUsesrAllDetals } from '../../app.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportExcelService } from '../../shared/utils/export-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../Employee/employee/employee.component';
import { SharedUiDesignSystemModule } from '../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [SharedUiDesignSystemModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent implements OnInit {
      emp_projects !: IUsesrAllDetals[];
      dataSource!: MatTableDataSource<IUsesrAllDetals>;
      
      displayedColumns: string[] = [
        'emp_id',
        'emp_fname',
        'email',
        'desiganation',
        'Project',
      ];
    
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      constructor(private commonService: CommonService,private exportexcelservice: ExportExcelService) {}
      ngOnInit(): void {
        this.getProjectsandEmployeesDetails();
        console.log(this.emp_projects);
        this.dataSource = new MatTableDataSource(this.emp_projects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }

    getProjectsandEmployeesDetails() {
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

    public capitalize(s: string): string {
      s = s.replace(/_/g, ' ');
      return s.charAt(0).toUpperCase() + s.slice(1);
    }

    exporttableToExcel() {
      this.exportexcelservice.exportToExcel(
        this.dataSource.data,
        'Employee details'
      );
    }

}
