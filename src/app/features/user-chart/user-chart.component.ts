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
    this.userData = this.usersService.userData.slice(2);
  }

  ngOnInit() {
    this.usersService.selectedUserChange$
      .subscribe(u => {
        this.user = <ChartUser>u;
        if (u) {
          this.user.applesOffset = u.apples * 10;
          this.user.bananasOffset = u.bananas * 10;
          this.user.kiwisOffset = u.kiwis * 10;
          this.user.orangesOffset = u.oranges * 10;
          this.user.lemonsOffset = u.lemons * 10;
        }

        this.cdr.markForCheck();
      });
  }

}
