import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../shared/type/user.type';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserChartComponent implements OnInit {
  user: User;

  constructor(private cdr: ChangeDetectorRef,
              private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.selectedUserChange$
      .subscribe(u => {
        this.user = u;
        this.cdr.markForCheck();
      });
  }

}
