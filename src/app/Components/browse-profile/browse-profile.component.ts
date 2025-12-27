import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-browse-profile',
  standalone: false,
  templateUrl: './browse-profile.component.html',
  styleUrl: './browse-profile.component.scss',
})
export class BrowseProfileComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Navigate to home after login
  goToHome() {
    this.authService.login();
    this.router.navigate(['/']);
  }

  // Fetch and set user data based on selected profile
  getUserData(idx: number) {
    console.log(idx);
    
    let userData = this.authService.getUserData(idx);
    console.log(userData);
    if (userData) {
      this.authService.setUserData(userData);
      // Navigate to home after setting user data
      this.goToHome();
    } else {
      alert('User not found');
    }
  }
}
