import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login({ username, password }: { username: string; password: string }): boolean {
    // Hardcoded credentials for testing
    if (username === 'admin' && password === 'admin') {
      const user = { username };
      localStorage.setItem('user', JSON.stringify(user)); // user
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUser(): { username: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
