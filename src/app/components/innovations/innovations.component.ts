import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PopOverComponent } from '../../shared/components/pop-over/pop-over.component';
import { InnovationPopupComponent } from '../../shared/components/innovation-popup/innovation-popup.component';
import { IInnovationDashboard, INotifications, IUserDetails } from '../../shared/service/interfaces/interfaces';
import { CommonService } from '../../shared/service/common.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { title } from 'process';
import { UserData, cardData } from '../../Employee/employee.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableComponent } from '../../shared/components/mat-table/mat-table/mat-table.component';

@Component({
  selector: 'app-innovations',
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
    MatTableComponent,],
  templateUrl: './innovations.component.html',
  styleUrl: './innovations.component.scss',
})
export class InnovationsComponent implements OnInit {
  public dialogRef!: MatDialog;
  public modalOpen: boolean = false;
  userDetails!: IUserDetails[];
  randomNum!: number;
  cardDetails!: cardData[];
  public activeCardId: number | null = null;
  dataSource!: MatTableDataSource<IInnovationDashboard>;
  headerTitle: string = 'Ideation';
  innovationRecords!: any[];
  valid_screen !: boolean;

  displayedColumns = [
    'title',
    'idea_description',
    'benifits',
    'technology',
    'estimated_effort',
    'status',
    'emp_name'
  ];
  
  constructor(public dialog: MatDialog,private commonService:CommonService,private notificationService:NotificationService) {
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }
  ngOnInit(): void {
    this.valid_screen = true;
    this.commonService.getUserdetails().subscribe((res) => {
      if (res) {
        this.userDetails = res;
        // console.log("User details",this.userDetails);
        // this.userId = this.userDetails[0]?.emp_id;
      }
    });
    this.commonService.getInnovations().subscribe((res) => {
      if(res){
        this.innovationRecords = res;
          this.dataSource = new MatTableDataSource(this.innovationRecords);
      }
    })
    this.getCardDetails();
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(InnovationPopupComponent, {
          width: '648px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'Innovation Request-modal',
          hasBackdrop: true,
        })
        .afterClosed()
        .subscribe((result: any) => {
          // console.log('The dialog was closed');
          if (result) {
            // console.log('Form data:', result);
            this.generateRandomNumbers();
            this.saveinnvations(result);
          }
        });
    }
    this.modalOpen = true;
  }

  public saveinnvations(data: any) {
    console.log(data)
    if(data != true || data != false){
    const payload: any = {
      sl_no: '',
      title: data?.title,
      idea_description: data?.description,
      idea_type: 'Innovation',
      benifits: data?.benifits,
      technology: data.technology,
      estimated_effort: data?.estimatedefforts,      
      emp_id: this.userDetails[0]?.emp_id,
      emp_name: this.userDetails[0]?.emp_fname + this.userDetails[0]?.emp_lname,
      project: this.userDetails[0]?.Project,
      approver: this.userDetails[0]?.repoting_manager_id,
      status: 'created',
      id: 'Innovation_'+this.randomNum,
    };
    this.commonService.addInnovationItem(payload).subscribe((res:any) => {
      const notificationPayload: INotifications = {
        id:'innovation_'+this.randomNum,
        emp_id: this.userDetails[0]?.emp_id,
        message: `New Innovation request has been raised by ${this.userDetails[0]?.emp_id} `,
        read: false,
        project:this.userDetails[0]?.Project,
        approver:this.userDetails[0]?.repoting_manager_id,
      };
      this.notificationService.createNotification(notificationPayload).subscribe();
    });
    }
  }

  // to generate random numbers
  generateRandomNumbers(): void {
    this.randomNum = this.commonService.getRandomNumber(1, 100);
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

    // used to get title and index of the card
    public onCardClick(index: number, title: string) {
      this.activeCardId = index;
      this.headerTitle = title;
      this.dataSource = new MatTableDataSource<IInnovationDashboard>();
      let requestObservable;
      switch (title) {
        case 'Completed':
          requestObservable = this.innovationRecords.filter(item => item.status === 'completed');
          this.dataSource = new MatTableDataSource(requestObservable);
          break;
        // case 'Innovation Onboarded':
        //   requestObservable = this.innovationRecords.filter(item => item.status === 'onboarded');
        //   this.dataSource = new MatTableDataSource(requestObservable);
        //   break;
        case 'Inprogress':
          requestObservable = this.innovationRecords.filter(item => item.status === 'inprogress');
          this.dataSource = new MatTableDataSource(requestObservable);
          break;
        default:
          requestObservable = this.innovationRecords;
          this.dataSource = new MatTableDataSource(requestObservable);
          break;
      }
    }
  

}
