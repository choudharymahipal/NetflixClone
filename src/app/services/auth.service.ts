import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal to track authentication status
  private isAuthenticated: WritableSignal<boolean> = signal(false);
  private userData: WritableSignal<any> = signal(null);

  // Simulated login
  login() {
    this.isAuthenticated.set(true);
  }

  // Simulated logout
  logout() {
    this.isAuthenticated.set(false);
  }

  // Get authentication status
  getAuthStatus(): Signal<boolean> {
    return this.isAuthenticated;
  }

  // Simulated user data
  getUserData(id?: number) {
    let users: any[] = [
      { id: 1, name: 'Mahipal', email: 'mahipal@example.com' },
      { id: 2, name: 'Kids', email: 'kids@example.com' }
    ];

    if (id !== undefined) {
      return users.find(user => user.id === id);
    }

    return users[0];
  }

  // Set user data
  setUserData(data: any) {
    this.userData.set(data);
  }

  // Get current user data
  getCurrentUserData(): Signal<any> {
    return this.userData;
  }
}
