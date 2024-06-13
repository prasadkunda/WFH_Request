import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatIconModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  cards = [
    { icon: 'list_alt', title: 'Total Requests', number: 10 },
    { icon: 'check_circle_outline', title: 'Approved', number: 6 },
    { icon: 'highlight_off', title: 'Rejected', number: 3 },
    { icon: 'library_add', title: 'New', number: 1 }
  ];
}
