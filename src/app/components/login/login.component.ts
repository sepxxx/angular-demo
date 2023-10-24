import { Component } from '@angular/core';
import { DemoMaterialModule } from 'src/app/modules/demo-material.module';
// import { MatCard, MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [DemoMaterialModule]
})
export class LoginComponent {

}
