import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Create form with validations
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.http.post('http://localhost:8080/api/products', this.productForm.value)
        .subscribe({
          next: () => {
            alert('Product added successfully!');
            this.productForm.reset();
          },
          error: () => alert('Something went wrong while saving.')
        });
    }
  }
}
