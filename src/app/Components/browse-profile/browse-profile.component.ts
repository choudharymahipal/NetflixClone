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
  profileError = '';
  loadingProfile = false;

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
    this.profileError = '';
    this.loadingProfile = true;
    try {
      const userData = await this.authService.getUserData(idx);
      if (!userData) {
        this.profileError = 'That profile could not be found. Please try again.';
        return;
      }
      this.authService.setUserData(userData);
      this.goToHome();
    } catch (error) {
      this.profileError = error instanceof Error
        ? error.message
        : 'Could not load profiles. Please try again.';
    } finally {
      this.loadingProfile = false;
    }
  }
}
