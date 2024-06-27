import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from './shared/service/common.service';
import { CommonModule, formatDate } from '@angular/common';
import { PopOverComponent } from './shared/components/pop-over/pop-over.component';
import { ManagerComponent } from './Manager/manager/manager.component';
import { SidenavbarComponent } from './shared/components/sidenavbar/sidenavbar.component';
import {
  MatMenuModule,
  MAT_MENU_DEFAULT_OPTIONS,
} from '@angular/material/menu';
import { INotifications, NotificationsComponent } from './shared/components/notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from './shared/service/notification/notification.service';

export interface IUserDetails {
  emp_id: string;
  emp_name: string;
  emp_fname: string;
  emp_mname: string;
  emp_lname: string;
  email: string;
  desiganation: string;
  Project: string;
}

export interface IUsesrAllDetals {
  emp_id: string;
  emp_name: string;
  emp_fname: string;
  emp_mname: string;
  emp_lname: string;
  email: string;
  desiganation: string;
  Project: string;
}

export interface IUsesrRequestsDetails {
  emp_id: string;
  email: string;
  Project: string;
  requested_date: string;
  no_of_days: string;
  status: string;
  comments: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    EmployeeComponent,
    MatCardModule,
    CommonModule,
    PopOverComponent,
    ManagerComponent,
    SidenavbarComponent,
    MatMenuModule,
    NotificationsComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: {
        overlayPanelClass: 'custom_class',
      },
    },
  ],
})
export class AppComponent {
  @ViewChild('demo') public demo!: ElementRef;
  public dialogRef!: MatDialog;
  title = 'WFH_Request';
  greeting: string = '';
  greetingTimes: { [key: string]: string } = {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
  };
  userDetails!: IUserDetails[];
  public currentDate: string;
  public userName!: string;
  isOffCanvasVisible = false;
  user_role: string = '';
  sidebarExpanded = true;
  public modalOpen: boolean = false;
  private apiUrl = [
    'http://localhost:3000/Created',
    'http://localhost:3000/AllRequests',
  ]; // JSON server URL
  projects_List !: any[];

  constructor(
    private commonservice: CommonService,
    public dialog: MatDialog,
    private http: HttpClient,
    private notificationService:NotificationService
  ) {
    this.currentDate = formatDate(new Date(), 'EEEE MMMM d', 'en');
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(PopOverComponent, {
          width: '848px',
          height: '544px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'WFH Request-modal',
          hasBackdrop: true,
        })
        .afterClosed()
        .subscribe((result: any) => {
          console.log('The dialog was closed');
          if (result) {
            console.log('Form data:', result);
            this.saveWFHR(result);
          }
        });
    }
    this.modalOpen = true;
  }

  ngOnInit() {
    this.getUserDetails();
    this.setGreeting();
    this.getProjects_Manager();
    // console.log("user_role",this.user_role);
  }

  setGreeting() {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      this.greeting = this.greetingTimes['morning'];
    } else if (hour < 18) {
      this.greeting = this.greetingTimes['afternoon'];
    } else {
      this.greeting = this.greetingTimes['evening'];
    }
  }

  getUserDetails() {
    this.commonservice.getUserdetails().subscribe((res) => {
      if(res && Array.isArray(res)){
      this.userDetails = res;
      this.userName = `${this.userDetails[0]?.emp_fname} ${this.userDetails[0]?.emp_mname} ${this.userDetails[0]?.emp_lname}`;
      this.user_role = this.userDetails[0]?.desiganation;
      }
    });
  }

  // showOffCanvas() {
  //   this;
  // }

  // hideOffCanvas() {
  //   this.isOffCanvasVisible = false;
  // }

  // ngAfterViewInit() {
  //   if (this.demo) {
  //     this.showOffCanvas();
  //   } else {
  //     this.hideOffCanvas();
  //   }
  // }
  // ngAfterViewInit() {
  // Initialize your offcanvas component here
  // For example, if you're using a third-party library like Offcanvas.js:
  //new Offcanvas(this.demo.nativeElement, {
  //this.backdrop = true; // or any other configuration
  //});
  //}

  public saveWFHR(data: any) {
    console.log(data)
    const payload: any = {
      sl_no: '',
      emp_id: this.userDetails[0]?.emp_id,
      project: this.userDetails[0]?.Project,
      requested_date: formatDate(data.startDate, 'MM/dd/yyyy', 'en'),
      approved_date: '',
      approver: '',
      status: 'Created',
      comments: data.comments,
      id: '',
    };
    this.commonservice.addItem(payload).subscribe((res:any) => {
      const notificationPayload: INotifications = {
        id:'1',
        emp_id: this.userDetails[0]?.emp_id,
        message: `New WFH request has been raised by ${this.userDetails[0]?.emp_id} `,
        read: false,
        project:this.userDetails[0]?.Project,
        approver:'QE1002',
      };
      this.notificationService.createNotification(notificationPayload).subscribe();
    });
  }

  public getProjects_Manager() {
    this.commonservice.getProjects_Manager().subscribe(res => {
        if(res){
          this.projects_List = res;
        }
    }) 
  }

  // public addItem(item: any): void {
  //   this.apiUrl.forEach((url) => {
  //     return this.http.post(url, item).pipe(
  //       catchError(this.handleError));
  //   });
  // }
  // private handleError(error: HttpErrorResponse) {
  //   console.log(error);
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
