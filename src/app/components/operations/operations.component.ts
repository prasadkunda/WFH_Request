import { Component } from '@angular/core';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommingsoonComponent],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss'
})
export class OperationsComponent {

}
