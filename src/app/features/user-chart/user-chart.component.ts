import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../shared/type/user-data.type';
import { User } from '../../shared/type/user.type';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChartComponent implements OnInit {
  user: User;
  userData: UserData[];

  constructor(private cdr: ChangeDetectorRef,
              private usersService: UsersService) {
    this.userData = this.usersService.userData.slice(2);
  }

  ngOnInit() {
    this.usersService.selectedUserChange$
      .subscribe(u => {
        this.user = u;

        this.cdr.markForCheck();
      });
  }

}
