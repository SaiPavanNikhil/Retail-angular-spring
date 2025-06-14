import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  vendorCount = 0;
  productCount = 0;
  orderCount = 0;

  constructor(private http: HttpClient, public router: Router) {}

  // ✅ Only show cards on /dashboard
  isDashboardHome(): boolean {
    return this.router.url === '/dashboard';
  }

  // ✅ Fetch data on load
  ngOnInit(): void {
    this.http.get<number>('http://localhost:8080/api/vendors/count')
      .subscribe(count => this.vendorCount = count);

    this.http.get<number>('http://localhost:8080/api/products/count')
      .subscribe(count => this.productCount = count);

    this.http.get<number>('http://localhost:8080/api/orders/count')
      .subscribe(count => this.orderCount = count);
  }
}
