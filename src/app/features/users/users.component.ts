import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';

interface UIUser extends User {
  selected: boolean;
}

export class UsersDataSource extends DataSource<UIUser> {
  constructor(private dataChange$: BehaviorSubject<User[]>, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<UIUser[]> {
    const displayDataChanges = [
      this.paginator.page,
      this.dataChange$
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

      return this.dataChange$.value.slice(startIndex, startIndex + this.paginator.pageSize)
        .map((user: User): UIUser => <UIUser> user);
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
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  userTrackBy = (index: number, item: User) => item.id;

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.displayedColumns = [
      'selected',
      'userId',
      'userName'
    ];

    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }
}
