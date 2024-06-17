import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from './shared/service/common.service';

export interface IUserDetails {
  emp_id : string;
  emp_name : string;
  email : string;
  desiganation : string;
  Project : string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, EmployeeComponent,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'WFH_Request';
  greeting : string =  '';
  greetingTimes: { [key:  string]:string} = {morning:'Good Morning',afternoon:'Good Afternoon',evening:'Good Evening',};
  userDetails !: IUserDetails[];

  constructor(private commonservice:CommonService){}

   ngOnInit() {
    this.getUserDetails();
    this.setGreeting();
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
  this.commonservice.getUserdetails().subscribe(res => {
    if(res && Array.isArray(res)){
      this.userDetails = res;
    }    
  });
  console.log("user Details",this.userDetails);
 }
}


