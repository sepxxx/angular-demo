import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
import {Role} from '../../shared/helpers'
import {ChangeDetectorRef} from '@angular/core';
import { UserInfoButtonComponent } from '../user-info-button/user-info-button.component';
import { Router } from '@angular/router';
var ELEMENT_DATA: User[] = [

];

@Component({
  selector: 'users-table',
  styleUrls: ['users-table.component.css'],
  templateUrl: 'users-table.component.html',
  standalone: true,
  imports: [MatTableModule, UserInfoButtonComponent],
  
})

export class UsersTableComponent implements OnInit{

  displayedColumns: string[] = ['id', 'username', 'role', 'button'];
  dataSource: any;
  // dataSource = ELEMENT_DATA;


  constructor(private userService: UserService, private cdr:ChangeDetectorRef,private router: Router) {}
  ngOnInit(): void {
      // throw new Error('Method not implemented.');
      this.userService.getAll().subscribe(users => { 
        // ELEMENT_DATA=users;
        this.dataSource = new MatTableDataSource<any> (users);
        console.log(ELEMENT_DATA);
        // this.cdr.detectChanges();
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}