import { Component, effect } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  title = 'NetflixClone';
  isAuthenticated = false;

  constructor(private authService: AuthService) {
    effect(() => {
      this.isAuthenticated = this.authService.getAuthStatus()();
    });
  }
}
