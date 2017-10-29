import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../shared/type/user-data.type';
import { User } from '../../shared/type/user.type';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
  user: User;
  userData: UserData[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private usersService: UsersService) {
    this.userData = this.usersService.userData;
  }

  ngOnInit() {
    if (this.data.user) {
      this.user = Object.assign({}, this.data.user);
    } else {
      this.user = <User>{};
    }
  }

}
