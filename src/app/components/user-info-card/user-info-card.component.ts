import { Component, Input, OnInit } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class UserInfoCardComponent implements OnInit{
  @Input() userIn?: User;
  
  constructor(private userService:UserService) {

  }
  ngOnInit(): void {
      if(this.userIn) {
        var innerUser: User = this.userIn;
        innerUser.username = "BUGAGA";
        this.userService.triggerUsersUpdate(innerUser);
      }
  }



}
