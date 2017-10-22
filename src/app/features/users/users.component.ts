import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';
import { UsersDataSource } from './users.data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  someChecked: boolean;
  allChecked: boolean;

  usersLength: number;
  private uiUsers: User[];

  userTrackBy = (index: number, item: User): string => item.id;

  constructor(public usersService: UsersService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.connect();
  }

  ngAfterViewInit(): void {
    this.usersDataSource.connect().subscribe((users: User[]): void => {
      this.uiUsers = users;
      this.updateMainCheckbox();
    });
  }

  connect(): void {
    this.displayedColumns = [
      'checked',
      'userId',
      'userName'
    ];

    this.usersService.dataChange$.subscribe(u => this.usersLength = u.length);
    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }

  updateAllCheckboxes(checked: boolean): void {
    this.uiUsers.forEach(u => u.checked = checked);
  }

  updateMainCheckbox(): void {
    const checkedUsersNo = this.uiUsers.filter(u => u.checked).length;

    this.someChecked = checkedUsersNo > 0 && checkedUsersNo < this.uiUsers.length;
    this.allChecked = checkedUsersNo === this.uiUsers.length;
    this.cdr.markForCheck();
  }

  deleteChecked() {
    this.usersService.dataChange$.next(this.usersService.data().filter(u => !u.checked));
  }
}
