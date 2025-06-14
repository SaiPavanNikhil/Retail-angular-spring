import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service'; // Ensure correct path

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  expanded = false;

  constructor(private authService: AuthService, private router: Router) {}

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
