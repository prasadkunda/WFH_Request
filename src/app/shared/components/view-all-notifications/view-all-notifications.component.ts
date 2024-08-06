import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-notifications',
  standalone: true,
  imports: [],
  templateUrl: './view-all-notifications.component.html',
  styleUrl: './view-all-notifications.component.scss'
})
export class ViewAllNotificationsComponent {
  constructor(private router:Router) {}

  // navigateviewall() {
  //   this.router.navigate(['viewall-trainings']);
  // }
}
