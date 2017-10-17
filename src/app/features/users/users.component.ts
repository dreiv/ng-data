import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';

export class UsersDataSource extends DataSource<User> {
  constructor(private dataChange$: BehaviorSubject<User[]>, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<User[]> {
    const displayDataChanges = [
      this.paginator.page,
      this.dataChange$
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

      return this.dataChange$.value.slice(startIndex, startIndex + this.paginator.pageSize);
    });
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

  userTrackBy = (index: number, item: User) => item.id;
  @ViewChild(MatPaginator) private paginator: MatPaginator;

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.displayedColumns = [
      'check',
      'userId',
      'userName'
    ];

    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }
}
