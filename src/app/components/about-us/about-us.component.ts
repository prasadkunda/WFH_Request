import { Component } from '@angular/core';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommingsoonComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
