import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/shared/helpers';
import {Role} from '../../shared/helpers'
import {ChangeDetectorRef} from '@angular/core';

var ELEMENT_DATA: User[] = [

];

@Component({
  selector: 'users-table',
  styleUrls: ['users-table.component.css'],
  templateUrl: 'users-table.component.html',
  standalone: true,
  imports: [MatTableModule],
})

export class UsersTableComponent implements OnInit{

  displayedColumns: string[] = ['id', 'username', 'role'];
  dataSource: any;
  // dataSource = ELEMENT_DATA;
  constructor(private userService: UserService, private cdr:ChangeDetectorRef) {}
  ngOnInit(): void {
      // throw new Error('Method not implemented.');
      this.userService.getAll().subscribe(users => { 
        // ELEMENT_DATA=users;
        this.dataSource = new MatTableDataSource<any> (users);
        console.log(ELEMENT_DATA);
        this.cdr.detectChanges();
    });
  }

}