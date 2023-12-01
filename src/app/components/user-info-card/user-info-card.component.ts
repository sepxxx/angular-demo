import { Component, Input } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { User } from 'src/app/shared/helpers';
@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class UserInfoCardComponent {
  @Input() userIn?: User;
}
