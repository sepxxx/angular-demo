import { Component, Input, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule],
})
export class UserInfoCardComponent implements OnInit{
  @Input() userIn?: User;
  urlValue: string = '';
  constructor(private userService:UserService) {

  }
  ngOnInit(): void {

  }
  readUrl() {
    console.log('Прочитан URL:', this.urlValue);
    if(this.userIn) {
      var innerUser: User = this.userIn;
      // innerUser.username = "BUGAGA";
      innerUser.imageUrl = this.urlValue;
      this.userService.triggerUsersUpdate(innerUser);
    }
  }



}
