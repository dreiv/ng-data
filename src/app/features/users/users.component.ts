import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/operator/filter';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';
import { UsersDataSource } from './users.data';

interface Data {
  colDef: string;
  headerDef: string;
  celDef: string;
}

class DataImpl implements Data {
  constructor(public colDef, public headerDef, public celDef) {}
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  data: DataImpl[];
  displayedColumns: string[] = [];
  usersDataSource: UsersDataSource | null;

  usersLength: number;

  userTrackBy = (index: number, item: User): string => item.id;

  constructor(public usersService: UsersService) {
    this.data = [
      new DataImpl('userId', 'Id', 'id'),
      new DataImpl('userName', 'Name', 'name')
    ];
    this.displayedColumns = Array.from(this.data, d => d.colDef);
  }

  ngOnInit() {
    this.connect();

    this.usersService.dataChange$
      .filter(u => this.usersLength !== u.length)
      .subscribe(u => this.usersLength = u.length);
  }

  connect(): void {
    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);
  }

  addRow() {}
}
