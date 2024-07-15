import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PopOverComponent } from '../../shared/components/pop-over/pop-over.component';
import { InnovationPopupComponent } from '../../shared/components/innovation-popup/innovation-popup.component';
import { INotifications, IUserDetails } from '../../shared/service/interfaces/interfaces';
import { CommonService } from '../../shared/service/common.service';
import { NotificationService } from '../../shared/service/notification/notification.service';
import { title } from 'process';

@Component({
  selector: 'app-innovations',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './innovations.component.html',
  styleUrl: './innovations.component.scss',
})
export class InnovationsComponent implements OnInit {
  public dialogRef!: MatDialog;
  public modalOpen: boolean = false;
  userDetails!: IUserDetails[];
  randomNum!: number;

  constructor(public dialog: MatDialog,private commonService:CommonService,private notificationService:NotificationService) {
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }
  ngOnInit(): void {
    this.commonService.getUserdetails().subscribe((res) => {
      if (res) {
        this.userDetails = res;
        console.log("User details",this.userDetails);
        // this.userId = this.userDetails[0]?.emp_id;
      }
    });
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
          console.log('The dialog was closed');
          if (result) {
            console.log('Form data:', result);
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
      title: 'innovation',
      idea_description: data.description,
      idea_type: data.requesttype,
      benifits: data.benifits,
      technology: data.technology,
      estimated_effort: data.estimatedefforts,      
      emp_id: this.userDetails[0]?.emp_id,
      project: this.userDetails[0]?.Project,
      approver: this.userDetails[0]?.repoting_manager_id,
      status: 'Created',
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

}
