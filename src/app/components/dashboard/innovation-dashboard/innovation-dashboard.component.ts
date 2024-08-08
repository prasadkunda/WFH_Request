import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../../shared/service/common.service';
// import { MatTableDataSource } from '@angular/material/table';
import { IInnovationDashboard } from '../../../shared/service/interfaces/interfaces';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table/mat-table.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-innovation-dashboard',
  standalone: true,
  imports: [MatPaginatorModule,MatSortModule,CommonModule,MatTableComponent,MatTableModule,MatTableComponent,MatCardModule],
  templateUrl: './innovation-dashboard.component.html',
  styleUrl: './innovation-dashboard.component.scss'
})
export class InnovationDashboardComponent implements OnInit {

  dataSourceInnovations!: MatTableDataSource<IInnovationDashboard>;
  innovationRecords!: IInnovationDashboard[];

  displayedColumnsInnovations: string[] = [
    'title',
    'idea_description',
    'benifits',
    'technology',
    'estimated_effort',
    'status',
    'emp_name'
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
