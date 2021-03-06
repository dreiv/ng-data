import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatIconRegistry, MatPaginator } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../shared/type/user-data.type';
import { User } from '../../shared/type/user.type';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UsersDataSource } from './users-data-source';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  userData: UserData[];
  displayedColumns: string[];
  usersDataSource: UsersDataSource | null;

  usersLength: number;
  selectedUser: User;

  userTrackBy = (index: number, item: User): string => item.id;

  constructor(private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private usersService: UsersService) {
    iconRegistry
      .addSvgIconSetInNamespace('core',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon-set.svg'));

    this.userData = this.usersService.userData;
    this.displayedColumns = [
      'edit',
      ...Array.from(this.userData, d => d.colDef),
      'delete'
    ];
  }

  ngOnInit() {
    this.usersDataSource = new UsersDataSource(this.usersService.dataChange$, this.paginator);

    this.usersService.dataChange$
      .subscribe(u => this.usersLength = u.length);
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, <MatDialogConfig>{
      data: { title: 'Add' }
    });

    dialogRef.afterClosed()
      .filter(r => Object.keys(r).length > 0)
      .subscribe((result: User) => {
        const users = this.usersService.data();
        users.splice(this.paginator.pageIndex * this.paginator.pageSize, 0, result);
        this.usersService.dataChange$.next(users);

        this.cdr.markForCheck();
      });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, <MatDialogConfig>{
      data: { user: user, title: 'Edit' }
    });

    dialogRef.afterClosed()
      .filter(r => r)
      .subscribe((result: User) => {
        Object.assign(user, result);
        if (user === this.selectedUser) {
          this.usersService.selectedUserChange$.next(user);
        }

        this.cdr.markForCheck();
      });
  }

  deleteUser(user: User) {
    const users = this.usersService.data();
    users.splice(users.indexOf(user), 1);
    this.usersService.dataChange$.next(users);
    if (user === this.selectedUser) {
      this.usersService.selectedUserChange$.next(null);
    }

    this.cdr.markForCheck();
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.usersService.selectedUserChange$.next(user);
  }
}
