import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private staticDbURL = '/assets/db/users.json';
  private USER_DATA_KEY = 'userData';
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
    let users = fetch(this.staticDbURL)
      .then((response) => response.json())
      .then((data) => data);

    return users.then((usersArray: any[]) =>
      usersArray.find((user) => user.id === id)
    );
  }

  // Set user data
  setUserData(data: any) {
    this.userData.set(data);
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
  }

  // Get current user data
  getCurrentUserData(): Signal<any> {
    let storedData = localStorage.getItem(this.USER_DATA_KEY);
    if (storedData) {
      this.isAuthenticated.set(true);
      this.userData.set(JSON.parse(storedData));
    }
    return this.userData;
  }
}
