import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [RouterModule,CommonModule,MatIconModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
