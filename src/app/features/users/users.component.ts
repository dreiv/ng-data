import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';

interface UIUser extends User {
  checked: boolean;
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

      return <UIUser[]> this.dataChange$.value.slice(startIndex, startIndex + this.paginator.pageSize);
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
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  someChecked: boolean;
  allChecked: boolean;
  users: UIUser[];

  userTrackBy = (index: number, item: User) => item.id;

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.connect();
  }

  ngAfterViewInit(): void {
    this.usersDataSource.connect().subscribe(users => this.users = users);
  }

  connect() {
    this.displayedColumns = [
      'checked',
      'userId',
      'userName'
    ];

    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }

  updateAllCheckboxes(checked: boolean) {
    this.users.forEach(user => user.checked = checked);
  }

  updateMainCheckbox() {
    const checkedUsersNo = this.users.filter(u => u.checked).length;

    this.someChecked = checkedUsersNo > 0 && checkedUsersNo < this.users.length;
    this.allChecked = checkedUsersNo === this.users.length;
  }
}
