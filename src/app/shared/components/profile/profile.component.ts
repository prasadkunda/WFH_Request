import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonService } from '../../service/common.service';
import { IUserDetails } from '../../service/interfaces/interfaces';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatListModule, MatMenuModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userDetails: any[] = [];
  constructor( private commonservice: CommonService, private router:Router,
    private sanitizer: DomSanitizer
   ){} 
   userDetailsq!: IUserDetails[];
   

  ngOnInit() {
    this.userDetails = [
      {
        avatar: 'https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-512.png'
 
      }
    ];
    this.commonservice.getUserdetails().subscribe((data) => {
      this.userDetailsq = data;
    })
  }
  dropdownOpen: boolean = false; 


  onProfileClick() {
    const menuTrigger = document.querySelector('[mat-menu-trigger-for="profileMenu"]');
    if (menuTrigger) {
      (menuTrigger as HTMLElement).click();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  onSettingsClick() {   
    console.log('Settings clicked');
  }

  logout() {  
    console.log('Logout clicked'); 
    sessionStorage.clear();   
  }  
  getUserDetails() {
    this.commonservice.getUserdetails().subscribe((res) => {
      if(res && Array.isArray(res)){
      this.userDetails = res;      
      }
    });
  }
}
