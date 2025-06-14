import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFiles: (File | null)[] = [null, null, null];
  isUploading = false;  // ✅ New: track upload state

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFiles[index] = file;
    } else {
      alert('Please upload only PDF files.');
      event.target.value = ''; // Reset input if invalid
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || this.selectedFiles.some(file => file === null)) {
      alert('Please fill all fields and upload 3 PDFs.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.uploadForm.value.name);

    this.selectedFiles.forEach((file, idx) => {
      formData.append(`pdf${idx + 1}`, file as File);
    });

    this.isUploading = true;  // ✅ Start upload
    this.http.post('http://localhost:8080/api/uploads', formData)
      .subscribe({
        next: () => {
          alert('Upload successful');
          this.uploadForm.reset();
          this.selectedFiles = [null, null, null];
        },
        error: () => {
          alert('Upload failed');
        },
        complete: () => {
          this.isUploading = false;  // ✅ Reset upload state
        }
      });
  }
}
