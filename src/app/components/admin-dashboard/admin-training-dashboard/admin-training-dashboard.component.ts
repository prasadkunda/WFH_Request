import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../../../shared/service/common.service';
import { SharedUiDesignSystemModule } from '../../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table/mat-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-training-dashboard',
  standalone: true,
  imports: [MatPaginatorModule,MatSortModule,CommonModule,MatTableComponent,MatTableModule,MatCardModule,MatMenuModule,MatButtonModule,MatIconModule],
  templateUrl: './admin-training-dashboard.component.html',
  styleUrl: './admin-training-dashboard.component.scss'
})
export class AdminTrainingDashboardComponent {
  dataSource!: MatTableDataSource<any>;
  records!: any;

  displayedColumns: string[] = [
    'emp_name',
    'emp_id',
    'training',
    'action'
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    this.getTrainingList(); 
  }

  public getTrainingList() {
    this.commonService.getTriningRegistration().subscribe((res) => {
      if(res){
        this.records = res;
          this.dataSource = new MatTableDataSource(this.records);
          if(this.dataSource){
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

      }
    })
  }
}
