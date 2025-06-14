import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  getUsername() {
    return this.auth.getUser()?.username;
  }
}
