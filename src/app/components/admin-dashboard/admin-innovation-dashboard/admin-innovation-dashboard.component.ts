import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IInnovationDashboard } from '../../../shared/service/interfaces/interfaces';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonService } from '../../../shared/service/common.service';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table/mat-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-innovation-dashboard',
  standalone: true,
  imports: [MatPaginatorModule,MatSortModule,CommonModule,MatTableModule,MatTableComponent,MatCardModule,MatMenuModule,MatButtonModule,MatIconModule],
  templateUrl: './admin-innovation-dashboard.component.html',
  styleUrl: './admin-innovation-dashboard.component.scss'
})
export class AdminInnovationDashboardComponent {

  dataSourceInnovations!: MatTableDataSource<IInnovationDashboard>;
  innovationRecords!: IInnovationDashboard[];

  displayedColumnsInnovations: string[] = [
    'title',
    'idea_description',
    'benifits',
    'technology',
    'estimated_effort',
    'status',
    'emp_name',
    'action'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    this.getInnovations(); 
    // if(this.dataSourceInnovations) {
    //   this.dataSourceInnovations.paginator = this.paginator;
    //   this.dataSourceInnovations.sort = this.sort; 
    // }
 
  }

  // ngAfterViewInit(): void {
  //   this.dataSourceInnovations.paginator = this.paginator;
  //   this.dataSourceInnovations.sort = this.sort;
  // }

  public getInnovations() {
    this.commonService.getInnovations().subscribe((res) => {
      if(res){
        this.innovationRecords = res;
          this.dataSourceInnovations = new MatTableDataSource(this.innovationRecords);
          if(this.dataSourceInnovations){
            this.dataSourceInnovations.paginator = this.paginator;
            this.dataSourceInnovations.sort = this.sort;
          }

      }
    })
  }
}
