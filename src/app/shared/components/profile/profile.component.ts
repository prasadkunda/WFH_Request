import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userImage: string | null = null; // URL of the user's profile image
  userName: string = 'John Doe'; // Replace with actual user name
  userInitials: string = this.getInitials(this.userName); // Generate initials
  dropdownOpen: boolean = false; // Dropdown state

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onProfileClick() {
    // Handle profile click
    console.log('Profile clicked');
  }

  onSettingsClick() {
    // Handle settings click
    console.log('Settings clicked');
  }

  onLogoutClick() {
    // Handle logout click
    console.log('Logout clicked');
  }

  // Method to get initials from the user's name
  private getInitials(name: string): string {
    const names = name.split(' ');
    return names.length > 1
      ? names[0].charAt(0) + names[1].charAt(0)
      : names[0].charAt(0);
  }
}
