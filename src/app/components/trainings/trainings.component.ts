import { Component } from '@angular/core';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [CommingsoonComponent],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent {

}
