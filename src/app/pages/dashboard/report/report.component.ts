import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  vendorControl = new FormControl();
  vendors: any[] = [];
  filteredVendors: any[] = [];
  productsByVendor: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch vendors for dropdown
    this.http.get<any[]>('http://localhost:8080/api/vendors')
      .subscribe(data => {
        this.vendors = data;
        this.filteredVendors = data;
      });

    // Setup autocomplete filter
    this.vendorControl.valueChanges.subscribe(val => {
      let searchStr = '';
      if (typeof val === 'string') {
        searchStr = val.toLowerCase();
      } else if (val?.vendorName) {
        searchStr = val.vendorName.toLowerCase();
      }

      this.filteredVendors = this.vendors.filter(v =>
        v.vendorName.toLowerCase().includes(searchStr)
      );
    });
  }

  displayVendorName(vendor: any): string {
    return vendor?.vendorName || '';
  }

  onSearch(): void {
    const vendorId = this.vendorControl.value?.id;
    if (vendorId) {
      this.http.get<any[]>(`http://localhost:8080/api/orders/vendor/${vendorId}`)
        .subscribe(data => {
          this.productsByVendor = data;  // Data is already list of products
        });
    } else {
      alert("Please select a vendor");
    }
  }
}
