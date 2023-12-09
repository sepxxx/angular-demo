import { Component, Input, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, CommonModule],
})
export class UserInfoCardComponent implements OnInit{
  @Input() userIn?: User;
  selectedFile: File | null = null;
  // urlValue: string = '';
  constructor(private userService:UserService, private sanitizer: DomSanitizer, private http: HttpClient) {
    

  }
  ngOnInit(): void {
      // console.log(this.userIn?.imageData)
  }
  // readUrl() {
  //   console.log('Прочитан URL:', this.urlValue);
  //   if(this.userIn) {
  //     var innerUser: User = this.userIn;
  //     // innerUser.username = "BUGAGA";
  //     // innerUser.imageUrl = this.urlValue;
  //     this.userService.triggerUsersUpdate(innerUser);
  //   }
  // }

  getSafeImageData(imageData: string): SafeResourceUrl {
    const imageUrl = `data:image/jpeg;base64,${imageData}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }
  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = new Uint8Array(buffer);
    const binaryArray = Array.from(binary);
    const binaryString = String.fromCharCode(...binaryArray);
    return btoa(binaryString);
  }
  
  // onUpload(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile);

  //     this.http.post<string>(environment.apiUrl + `/user/${this.userIn?.id}/upload-image`, formData)
  //       .subscribe(response => {
  //         console.log('Image uploaded successfully', response);
  //         if(this.userIn) {
  //           var innerUser: User = this.userIn;
  //           innerUser.imageData = response;
  //           this.userService.triggerUsersUpdate(innerUser);
  //             console.log(this.selectedFile)
  //         }
  //       });
  //   }
  // }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
  
      this.http.post(environment.apiUrl + `/user/${this.userIn?.id}/upload-image`, formData)
        .subscribe(response => {
          console.log('Image uploaded successfully', response);
  
          if (this.userIn && this.selectedFile) {
            const reader = new FileReader();
  
            reader.onload = (event: any) => {
              if (this.userIn) {
              const imageData: ArrayBuffer = event.target.result;
              this.userIn.imageData = this.arrayBufferToBase64(imageData);
              this.userService.triggerUsersUpdate(this.userIn);
              }
            };
  
            reader.readAsArrayBuffer(this.selectedFile);
          }
        });
    }
  }

}
