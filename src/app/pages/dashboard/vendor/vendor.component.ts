import { Component } from '@angular/core';
// import { HeaderComponent } from "../../../shared/header/header.component";
// import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  vendorForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form with validation
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  // Submit handler
  onSubmit() {
    if (this.vendorForm.valid) {
      this.http.post('http://localhost:8080/api/vendors', this.vendorForm.value)
        .subscribe({
          next: () => {
            alert('Vendor added successfully!');
            this.vendorForm.reset();
          },
          error: (err) => {
            console.error('Error:', err);
            alert('Failed to add vendor.');
          }
        });
    }
  }

}
