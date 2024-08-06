import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeComponent } from './Employee/employee.component';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from './shared/service/common.service';
import { CommonModule, formatDate } from '@angular/common';
import { PopOverComponent } from './shared/components/pop-over/pop-over.component';
import { ManagerComponent } from './Manager/manager.component';
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
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';

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
    HttpClientModule,
    ProfileComponent,
    ReactiveFormsModule,
    MatInputModule,
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
    private notificationService:NotificationService,
    private router:Router
  ) {
    this.currentDate = formatDate(new Date(), 'EEEE MMMM d', 'en');
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
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
      this.user_role = this.userDetails[0]?.designation;
      if(this.user_role === 'manager'){
        this.router.navigate(['manager']);
      }else if(this.user_role === 'Senior Software Developer'){
        this.router.navigate(['innovations']);
      }
      }
    });
  }
  

  public getProjects_Manager() {
    this.projects_List = [];
    if(this.user_role === "manager"){
      this.commonservice.getProjects_Manager().subscribe(res => {
        if(res){
          this.projects_List = res;
        }
    })
    } else if(this.user_role === "Senior Software Developer"){
      this.commonservice.getSidenav_Options_Employee().subscribe(res => {
        if(res){
          this.projects_List = res;
        }
    })
    }
    
  }
}
