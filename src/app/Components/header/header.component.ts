import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sectionSelected = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();
  userData: any;
  profileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userData = this.authService.getCurrentUserData()();
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/browse']);
  }

  switchProfile(): void {
    this.profileMenuOpen = false;
    this.router.navigate(['/browse']);
  }
}
