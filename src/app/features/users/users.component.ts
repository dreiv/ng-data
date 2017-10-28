import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/operator/filter';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';
import { UsersDataSource } from './users.data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  usersDataSource: UsersDataSource | null;
  displayedColumns: string[] = [];

  usersLength: number;

  userTrackBy = (index: number, item: User): string => item.id;

  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.connect();

    this.usersService.dataChange$
      .filter(u => this.usersLength !== u.length)
      .subscribe(u => this.usersLength = u.length);
  }

  connect(): void {
    this.displayedColumns = [
      'userId',
      'userName'
    ];

    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }

  addRow() {}
}
