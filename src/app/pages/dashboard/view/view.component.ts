import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {

  uploads: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Optionally, replace this API if you're not storing metadata in DB
    // Otherwise, you can manually build uploads[] with names if only using folder
    this.http.get<any[]>('http://localhost:8080/api/uploads')
      .subscribe({
        next: data => this.uploads = data,
        error: err => {
          console.error('Failed to load uploads', err);
          alert('Could not load uploads');
        }
      }); 
  }

  /**
   * Call backend to merge PDFs and download the merged file.
   */
  generateMergedPDF(upload: any): void {
    this.http.post(`http://localhost:8080/api/merge`, { name: upload.name }, { responseType: 'blob' })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${upload.name}_merged.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Merge failed', err);
          alert('Failed to generate merged PDF. Please ensure files exist.');
        }
      });
  }
}
