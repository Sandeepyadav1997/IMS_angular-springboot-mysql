import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InternService } from '../intern.service'; // Adjust the path as necessary

interface FileData {
  name: string;
  url: string;
}

interface FileMapping {
  files: FileData[];
  errorMessage: string;
}

@Component({
  selector: 'app-end-internship-dialog',
  templateUrl: './end-internship-dialog.component.html',
  styleUrls: ['./end-internship-dialog.component.css']
})
export class EndInternshipDialogComponent {
  fileMapping: {
    pdf: FileMapping;
    presentation: FileMapping;
    zip: FileMapping;
    txt: FileMapping;
  } = {
    pdf: { files: [], errorMessage: '' },
    presentation: { files: [], errorMessage: '' },
    zip: { files: [], errorMessage: '' },
    txt: { files: [], errorMessage: '' }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private internService: InternService // Inject the service
  ) {}

  onFileSelect(input: HTMLInputElement): void {
    input.click();
  }

  onFileChange(event: Event, type: 'pdf' | 'presentation' | 'zip' | 'txt'): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);

      files.forEach(file => {
        if (this.validateFile(file, type)) {
          const fileUrl = URL.createObjectURL(file);
          const fileData: FileData = { name: file.name, url: fileUrl };

          this.fileMapping[type].files.push(fileData);
        }
      });

      input.value = ''; // Clear the input value to allow re-selection of the same file
    }
  }

  validateFile(file: File, type: 'pdf' | 'presentation' | 'zip' | 'txt'): boolean {
    const validTypes: { [key: string]: string[] } = {
      pdf: ['application/pdf'],
      presentation: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
      zip: ['application/zip', 'application/x-zip-compressed'],
      txt: ['text/plain']
    };

    if (validTypes[type].includes(file.type)) {
      this.fileMapping[type].errorMessage = '';
      return true;
    } else {
      this.fileMapping[type].errorMessage = 'File type not correct';
      return false;
    }
  }

  removeFile(file: FileData, type: 'pdf' | 'presentation' | 'zip' | 'txt'): void {
    const filesArray = this.fileMapping[type].files;
    const index = filesArray.indexOf(file);
    if (index > -1) {
      filesArray.splice(index, 1);
      URL.revokeObjectURL(file.url); // Clean up memory
    }
  }

  // Check if all file types have at least one file
  isFormValid(): boolean {
    // Only PDF and Presentation files are mandatory
    return (
      this.fileMapping['pdf'].files.length > 0 &&
      this.fileMapping['presentation'].files.length > 0
    );
  }
  

  onSubmit(): void { 
    console.log(this.data);
    const emailDetails = {
      id: this.data.id,
      fullname: this.data.fullname,
      email: this.data.email,
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      domainId: this.data.domainId,
      projectname: this.data.projectname,
      mentor: this.data.mentor,
      association: this.data.association
    };
  
    // Send email details to mentor
    this.internService.sendToMentor(emailDetails).subscribe(
      response => {
        console.log('Email sent successfully');
        // Optionally, you can add additional logic here if needed
      },
      error => {
        console.error('Error sending email', error);
        // Handle error
      }
    );
  
    // New addition: Send intern details to incoming_request table
    this.internService.sendInternDetails(emailDetails).subscribe(
      response => {
        console.log('Intern details sent successfully');
        // Optionally, you can add additional logic here if needed
      },
      error => {
        console.error('Error sending intern details', error);
        // Handle error
      }
    );
  
    // Optionally, close the dialog or perform other actions after submitting
  }

}
