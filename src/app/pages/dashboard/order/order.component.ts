import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// ... same imports ...

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  vendors: any[] = [];
  filteredVendors: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.orderForm = this.fb.group({
      vendorSearch: [''],
      vendor: [null, Validators.required],
      product: [null, Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/vendors').subscribe(data => {
      this.vendors = data;
      this.filteredVendors = data;
    });

    this.http.get<any[]>('http://localhost:8080/api/products').subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.orderForm.get('vendorSearch')?.valueChanges.subscribe(val => {
      const searchStr = (val || '').toLowerCase();
      this.filteredVendors = this.vendors.filter(v =>
        v.vendorName.toLowerCase().includes(searchStr)
      );
    });

    this.orderForm.get('product')?.valueChanges.subscribe(val => {
      const searchStr = typeof val === 'string' ? val.toLowerCase() : val?.name?.toLowerCase() || '';
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(searchStr)
      );
    });
  }

  displayVendorName(vendor: any): string {
    return vendor?.vendorName || '';
  }

  displayProductName(product: any): string {
    return product?.name || '';
  }

  onVendorSelected(vendor: any) {
    this.orderForm.get('vendor')?.setValue(vendor);
  }

onSubmit() {
  if (this.orderForm.valid) {
    const payload = {
      vendorId: this.orderForm.value.vendor.id,
      productId: this.orderForm.value.product.id,
      date: this.orderForm.value.date
    };

    console.log('Submitting payload:', payload);

    this.http.post('http://localhost:8080/api/orders', payload).subscribe({
      next: (response) => {
        console.log('Order saved successfully', response);
        alert('Order submitted successfully!');
        this.orderForm.reset();
      },
      error: (err) => {
        console.error('Error saving order', err);
        alert('Failed to submit order!');
      }
    });
  } else {
    alert('Please complete all fields before submitting.');
  }
}

}
