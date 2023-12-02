import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
import {Role} from '../../shared/helpers'
import {ChangeDetectorRef} from '@angular/core';
import { UserInfoButtonComponent } from '../user-info-button/user-info-button.component';
import { Router } from '@angular/router';
import { UserInfoCardComponent } from '../user-info-card/user-info-card.component';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'users-table',
  styleUrls: ['users-table.component.css'],
  templateUrl: 'users-table.component.html',
  standalone: true,
  imports: [MatTableModule, UserInfoButtonComponent, UserInfoCardComponent, CommonModule],
  
})

export class UsersTableComponent implements OnInit{
  
  detailsMap = new Map();
  displayedColumns: string[] = ['id', 'username', 'role','url', 'button'];
  dataSource: any;
  ELEMENT_DATA: User[] = [];
  // dataSource = ELEMENT_DATA;


  constructor(private userService: UserService, private cdr:ChangeDetectorRef,private router: Router) {}
  // ngOnInit(): void {
  //     // throw new Error('Method not implemented.');
  //     this.userService.getAll().subscribe(users => { 
  //       this.ELEMENT_DATA=users;
  //       this.dataSource = new MatTableDataSource<any> (this.ELEMENT_DATA);
        
  //       console.log(this.ELEMENT_DATA);    
  //       this.fillMapWithIds(users);
  //       // console.log(ELEMENT_DATA);
  //       // this.cdr.detectChanges();
  //   });
    
  // }

  
  ngOnInit(): void {
    console.log("INIT")
    this.userService.currentUsers.subscribe(users=>{
      if(users) {
        this.ELEMENT_DATA = users;
        console.log(this.ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<any> (this.ELEMENT_DATA);
        this.cdr.detectChanges();

      }
    })
  }
  
  // ngOnInit(): void {
  //   console.log("INIT")

  //     if(this.userService.usersValue) {
  //       this.ELEMENT_DATA = this.userService.usersValue;
  //       console.log(this.ELEMENT_DATA);
  //       this.dataSource = new MatTableDataSource<any> (this.ELEMENT_DATA);
  //       this.cdr.detectChanges();
  //     }
    
  // }
  
  // navigateToHome() {
  //   this.router.navigate(['/home']);
  // }


  fillMapWithIds(users:User[] ) {
    users.forEach(user=> {
      this.detailsMap.set(user.id, false)
      // console.log(user.id, this.detailsMap.get(user.id));

    });
  }
}