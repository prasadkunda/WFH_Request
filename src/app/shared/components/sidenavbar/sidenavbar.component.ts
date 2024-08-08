import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { routesGetter } from '../../../app.routesjosn';

export interface IMenuItems {
  sl_no: string;
  project: string;
  id: string;
  icon: string;
  navigation_name:string;
}

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule,MatExpansionModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss',
})
export class SidenavbarComponent {
  @Input() isExpanded: boolean = false;
  private getroutes:any = routesGetter;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() projects!: any[];
  public myInnovationFlag: boolean = false;
  constructor(private router: Router) {}

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  public navigatingToComponents(index: number, value: IMenuItems): void {
    const get_routes = this.getroutes[value.project];
     this.router.navigate(['/'+ get_routes]);
    
  }

  navigatingToChildComponent(index: number, child: any) {
    // Your logic here
  }
}
