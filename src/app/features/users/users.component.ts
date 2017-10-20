import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';
import { UIUser, UsersDataSource } from './users.data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  someChecked: boolean;
  allChecked: boolean;

  userTrackBy = (index: number, item: User): string => item.id;
  private users: UIUser[];

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

  updateAllCheckboxes(checked: boolean): void {
    this.users.forEach((u: UIUser): boolean => u.checked = checked);
  }

  updateMainCheckbox() {
    const checkedUsersNo = this.users.filter(u => u.checked).length;

    this.someChecked = checkedUsersNo > 0 && checkedUsersNo < this.users.length;
    this.allChecked = checkedUsersNo === this.users.length;
  }
}
