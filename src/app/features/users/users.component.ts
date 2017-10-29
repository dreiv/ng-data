import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatIconRegistry, MatPaginator } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
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

  constructor(private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private usersService: UsersService) {
    iconRegistry
      .addSvgIconSetInNamespace('core',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon-set.svg'));

    this.data = [
      new DataImpl('userId', 'Id', 'id'),
      new DataImpl('userName', 'Name', 'name')
    ];
    this.displayedColumns = [
      'edit',
      ...Array.from(this.data, d => d.colDef),
      'delete'
    ];
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

  editRow(row: User) {
    console.log('edit', row);

    const dialogRef = this.dialog.open(UserDialogComponent);
  }

  deleteRow(row: User) {
    const users = this.usersService.data();
    users.splice(users.indexOf(row), 1);
    this.usersService.dataChange$.next(users);

    this.cdr.markForCheck();
  }
}
