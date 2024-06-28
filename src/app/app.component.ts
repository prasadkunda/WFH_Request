import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeComponent } from './Employee/employee.component';
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
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from './shared/service/notification/notification.service';
import { IUserDetails } from './shared/service/interfaces/interfaces';

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
  sidebarExpanded = false;
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

  // public openDialog(): void {
  //   if (!this.modalOpen) {
  //     this.dialog
  //       .open(PopOverComponent, {
  //         width: '848px',
  //         height: '544px',
  //         panelClass: 'custom_class',
  //         autoFocus: true,
  //         ariaLabel: 'WFH Request-modal',
  //         hasBackdrop: true,
  //       })
  //       .afterClosed()
  //       .subscribe((result: any) => {
  //         console.log('The dialog was closed');
  //         if (result) {
  //           console.log('Form data:', result);
  //           this.saveWFHR(result);
  //         }
  //       });
  //   }
  //   this.modalOpen = true;
  // }

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

  

  public getProjects_Manager() {
    if(this.user_role === "manager"){
      this.commonservice.getProjects_Manager().subscribe(res => {
        if(res){
          this.projects_List = res;
        }
    })
    } else {
      this.commonservice.getSidenav_Options_Employee().subscribe(res => {
        if(res){
          this.projects_List = res;
        }
    })
    }
    
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
