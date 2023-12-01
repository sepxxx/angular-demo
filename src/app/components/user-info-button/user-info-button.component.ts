import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/helpers';

@Component({
  selector: 'app-user-info-button',
  templateUrl: './user-info-button.component.html',
  styleUrls: ['./user-info-button.component.css'],
  standalone: true
})
export class UserInfoButtonComponent {
  @Input() userInButton?: User;

}
