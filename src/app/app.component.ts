import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from './shared/service/common.service';
import { CommonModule, formatDate } from '@angular/common';
import { PopOverComponent } from './shared/components/pop-over/pop-over.component';
import { ManagerComponent } from './Manager/manager/manager.component';

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
    ManagerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WFH_Request';
  greeting: string = '';
  greetingTimes: { [key: string]: string } = {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
  };
  userDetails!: IUserDetails;
  currentDate: string;
  public userName!: string;
  isOffCanvasVisible = false;
  user_role : string = '';

  constructor(private commonservice: CommonService) {
    this.currentDate = formatDate(new Date(), 'EEEE MMMM d', 'en');
  }

  ngOnInit() {
    this.getUserDetails();
    this.setGreeting();
    console.log("user_role",this.user_role);
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
      this.userDetails = res;
      this.userName = `${this.userDetails.emp_fname} ${this.userDetails.emp_mname} ${this.userDetails.emp_lname}`;
      this.user_role = this.userDetails?.desiganation;
    });
  }

  showOffCanvas() {
    this.isOffCanvasVisible = true;
  }

  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }
}
