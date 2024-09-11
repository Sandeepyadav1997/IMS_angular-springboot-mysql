import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service.service';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: File[] = [];
  fileNames: string[] = [];
  progressInfos: { fileName: string; progress: number }[] = [];
  errorMessages: string[] = [];
  successMessage: string = ''; 
  internId: number = 123; 

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.loadUploadedFiles();
  }

  // Method to handle file input changes
  onFileChange(event: any): void {
    const files: File[] = Array.from(event.target.files);

    // Prevent duplicates
    files.forEach((file) => {
      if (!this.selectedFiles.some(f => f.name === file.name)) {
        this.selectedFiles.push(file);
      }
    });

    event.target.value = null; 
  }

  // Method to upload files
  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      return;
    }

    this.progressInfos = [];
    this.errorMessages = [];
    this.successMessage = ''; 

    this.selectedFiles.forEach((file, index) => {
      this.progressInfos[index] = { fileName: file.name, progress: 0 };

      this.fileService.upload([file], this.internId).subscribe({
        next: () => {
          this.progressInfos[index].progress = 100;
          this.loadUploadedFiles();
          this.successMessage = `File ${file.name} uploaded successfully!`;

          // Clear the progress and message after 2 seconds
          setTimeout(() => {
            this.progressInfos = [];
            this.successMessage = ''; 
          }, 2000);
        },
        error: (err: any) => {
          this.errorMessages.push(`Upload failed for ${file.name}: ${err.message}`);
        }
      });
    });

    this.selectedFiles = [];
  }

  // Method to remove a file from the selection list
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  // Method to download a file
  downloadFile(fileName: string): void {
    this.fileService.download(fileName).subscribe(
      (blob: Blob | MediaSource) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (err: any) => this.errorMessages.push(`Download error: ${err.message}`)
    );
  }

  // Method to delete a file
  deleteFile(fileName: string): void {
    const confirmation = confirm(`Are you sure you want to delete ${fileName}?`);
    if (confirmation) {
      this.fileService.delete(fileName).subscribe({
        next: () => {
          this.loadUploadedFiles();
          alert(`${fileName} has been deleted successfully.`);
        },
        error: (err: any) => {
          this.errorMessages.push(`Delete error: ${err.message}`);
        }
      });
    }
  }

  // Method to load uploaded files from the server
  private loadUploadedFiles(): void {
    this.fileService.getUploadedFiles().subscribe({
      next: (fileNames: string[]) => {
        this.fileNames = fileNames;
      },
      error: (err: any) => this.errorMessages.push(`Load files error: ${err.message}`)
    });
  }
}
