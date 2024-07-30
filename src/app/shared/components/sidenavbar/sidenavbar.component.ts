import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';

export interface IMenuItems {
  sl_no: string;
  project: string;
  id: string;
  icon: string;
}

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss',
})
export class SidenavbarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() projects!: any[];
  constructor(private router: Router) {}

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  public navigatingToComponents(index: number, value: IMenuItems): void {
    if (value.project === 'Innovations') {
      this.router.navigate(['/innovations']);
    } else if (value.project === 'Facilities') {
      this.router.navigate(['/facility']);
    } else if (value.project === 'WFH') {
      this.router.navigate(['/employee']);
    } else if (value.project === 'Operations') {
      this.router.navigate(['/operations']);
    }else if (value.project === 'Request') {
      this.router.navigate(['/request']);
    }else if (value.project === 'Trainings') {
      this.router.navigate(['/trainings']);
    }else if (value.project === 'Home') {
      this.router.navigate(['/manager']);
    }else if(value.project === 'About Us'){
      this.router.navigate(['/about-us'])
    }else if(value.project === 'Contact Us'){
      this.router.navigate(['/contact-us'])
    }else if(value.project === 'Admin'){
      this.router.navigate(['/admin'])
    }else if(value.project === 'Login'){
      this.router.navigate(['/login'])
    }
  }
}
