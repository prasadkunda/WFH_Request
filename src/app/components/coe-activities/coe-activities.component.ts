import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';
import { CommonService } from '../../shared/service/common.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { cardData } from '../../Employee/employee.component';

@Component({
  selector: 'app-coe-activities',
  standalone: true,
  imports: [CommonModule,  MatGridListModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableComponent,
    MatCardModule],
  templateUrl: './coe-activities.component.html',
  styleUrl: './coe-activities.component.scss'
})
export class CoeActivitiesComponent implements OnInit{
  public activeCardId: number | null = null;
  cardDetails!: cardData[];
  constructor(private commonService:CommonService,private notificationService:NotificationService) {}
  ngOnInit(): void {
    this.getCardDetails();
  }
  public getCardDetails() {
    this.cardDetails = [];
    this.commonService.getInnovationCardDetails().subscribe((res) => {
      try {
        if (res && Array.isArray(res)) {
          this.cardDetails = res;
          // console.log(res);
        } else {
        }
      } catch {
        console.error('Unexpected response :', res);
      }
    });
  }
}
