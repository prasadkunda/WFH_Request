import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { NotificationService } from '../../service/notification/notification.service';
import { CommonService } from '../../service/common.service';
import { INotifications, IUserDetails } from '../../service/interfaces/interfaces';


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  encapsulation:ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit{
  public contentHeight!: number;
  public notifications: INotifications[] = [];
  public markallRead!: any;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  userDetails!: IUserDetails[];
 userId !: string;
 uesr_role !: string;
 projects!: string[];

  constructor(private notificationService: NotificationService,private commonService: CommonService) {}
  ngOnInit(): void {
    this.getUserDetails();
    this.getProjects();
    // console.log('user details not',this.userDetails[0]);
    if(this.userDetails){
      this.userId = this.userDetails[0]?.emp_id;
    this.uesr_role = this.userDetails[0]?.designation;
    }
    this.loadNotifications();   
    // console.log('this.userId notification comp', this.userId);
    // console.log('this.desiganation notification comp', this.uesr_role);
  }

  public ngAfterViewInit(): void {
    // this.userId = this.commonService?.userId;
    this.menuTrigger?.menuOpened.subscribe(() => {
      setTimeout(() => {
        const menuElement = document.querySelector(
          '#menu_content_gird'
        ) as HTMLElement;
        if (menuElement) {
          this.contentHeight = menuElement.offsetHeight;
        }
      });
    });
  }

  loadNotifications() {
    if(this.uesr_role === 'manager') {
      this.notificationService.getNotificationsManager(this.userId).subscribe(notifications => { 
        this.notifications = notifications;
        // if(this.projects && this.projects.length > 0) {
        //   this.notifications = notifications.filter(item => {
        //     console.log('Checking project:', item.project);
        //     console.log('comparing',this.projects.includes(item.project));
        //     return this.projects.includes(item.project)
        //   }
             
        //     );
        // }   
      });
    }else {
      this.notificationService.getNotifications(this.userId).subscribe(notifications => {
        this.notifications = notifications;
      })
    }
  }

  getUserDetails() {
    this.commonService.getUserdetails().subscribe((res) => {
      if(res && Array.isArray(res)){
        this.userDetails = res;
      }      
    });
  }

  getProjects() {
    this.commonService.getProjects_Manager().subscribe(resp => {
      if(resp){          
      this.projects = resp;
      }
    })
  }

  public MarkAllAsRead(): any {
    this.markallRead = this.notifications.forEach((item: INotifications) => {
      //item.IsRead = true;
    });
    console.log(this.markallRead, 'this.data');
  }
  public announcementsTile(item:any,i:any) {}
  public removeAnnouncementTile(item:any,i:any) {}
  public viewAllAnnouncements(){}
}
