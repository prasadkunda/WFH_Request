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
    } else if (value.project === 'Raise WFH') {
      this.router.navigate(['/employee']);
    } else {
      this.router.navigate(['/operations']);
    }
  }
}
