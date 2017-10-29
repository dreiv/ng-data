import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../shared/type/user-data.type';
import { User } from '../../shared/type/user.type';

export interface ChartUser extends User {
  applesOffset: number;
  bananasOffset: number;
  kiwisOffset: number;
  orangesOffset: number;
  lemonsOffset: number;
}

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChartComponent implements OnInit {
  user: ChartUser;
  userData: UserData[];

  constructor(private cdr: ChangeDetectorRef,
              private usersService: UsersService) {
    this.userData = this.usersService.userData.slice(3);
  }

  ngOnInit() {
    const multiplier = 30;
    this.usersService.selectedUserChange$
      .subscribe(u => {
        this.user = <ChartUser>u;
        if (u) {
          this.user.applesOffset = u.apples * multiplier;
          this.user.bananasOffset = u.bananas * multiplier;
          this.user.kiwisOffset = u.kiwis * multiplier;
          this.user.orangesOffset = u.oranges * multiplier;
          this.user.lemonsOffset = u.lemons * multiplier;
        }

        this.cdr.markForCheck();
      });
  }

}
