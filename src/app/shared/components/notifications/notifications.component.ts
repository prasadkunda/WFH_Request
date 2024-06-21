import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

export interface INotifications {
  id: string;
  title: string;
  emp_id: string;
  status: string;
  request_id: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  public contentHeight!: number;
  public notifications: INotifications[] = [];
  public markallRead!: any;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  public ngAfterViewInit(): void {
    this.menuTrigger?.menuOpened.subscribe(() => {
      setTimeout(() => {
        const menuElement = document.querySelector(
          '#menu_content_gird'
        ) as HTMLElement;
        if (menuElement) {
          this.contentHeight = menuElement.offsetHeight;
          console.log('this.contentHeight', this.contentHeight);
        }
      });
    });
  }

  public MarkAllAsRead(): any {
    this.markallRead = this.notifications.forEach((item: INotifications) => {
      //item.IsRead = true;
    });
    console.log(this.markallRead, 'this.data');
  }
  public announcementsTile() {}
  public removeAnnouncementTile() {}
}
