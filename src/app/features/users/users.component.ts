import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';

export class UsersDataSource extends DataSource<User> {
  constructor(private dataChange$: BehaviorSubject<User[]>) {
    super();
  }

  connect(): Observable<User[]> {
    return this.dataChange$;
  }

  disconnect(): void {
    // No-op
  }
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.displayedColumns = [
      'userId',
      'userName'
    ];

    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$);
  }

}
