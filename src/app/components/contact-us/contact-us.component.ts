import { Component } from '@angular/core';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommingsoonComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

}
