import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8081/files'; 

  constructor(private http: HttpClient) {}

  // Upload files with intern ID
  upload(files: File[], internId: number): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('intern_id', internId.toString()); 

    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  // Download a specific file by name
  download(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`${this.baseUrl}/download/${fileName}`, {
      headers: headers,
      responseType: 'blob'
    });
  }

  // Get the list of all uploaded files
  getUploadedFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/list`);
  }

  // Delete a specific file by name
  delete(fileName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${fileName}`, {
      responseType: 'text' 
    });
  }
}
