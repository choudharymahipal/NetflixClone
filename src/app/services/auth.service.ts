import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private staticDbURL = new URL('assets/db/users.json', document.baseURI).toString();
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
    this.userData.set(null);
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  // Get authentication status
  getAuthStatus(): Signal<boolean> {
    return this.isAuthenticated;
  }

  // Simulated user data
  async getUserData(id?: number) {
    const response = await fetch(this.staticDbURL);
    if (!response.ok) {
      throw new Error(`Could not load profiles (${response.status}).`);
    }

    let usersArray: any[];
    try {
      usersArray = await response.json();
    } catch {
      throw new Error('The profile data could not be read.');
    }
    if (!Array.isArray(usersArray)) {
      throw new Error('The profile data has an invalid format.');
    }

    return usersArray.find((user) => user.id === id);
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
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && typeof parsedData.id === 'number') {
          this.isAuthenticated.set(true);
          this.userData.set(parsedData);
        } else {
          localStorage.removeItem(this.USER_DATA_KEY);
          this.isAuthenticated.set(false);
          this.userData.set(null);
        }
      } catch {
        localStorage.removeItem(this.USER_DATA_KEY);
        this.isAuthenticated.set(false);
        this.userData.set(null);
      }
    }
    return this.userData;
  }
}
