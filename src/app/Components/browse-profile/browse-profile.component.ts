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

  ngOnInit(): void {
    
  }

  // Navigate to home after login
  goToHome() {
    this.authService.login();
    this.router.navigate(['/']);
  }

  // Fetch and set user data based on selected profile
  async getUserData(idx: number): Promise<void> {
    const userData = await this.authService.getUserData(idx);
    if (userData) {
      this.authService.setUserData(userData);
      this.goToHome();
    } else {
      alert('User not found');
    }
  }
}
