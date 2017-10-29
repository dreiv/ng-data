import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserImpl } from '../shared/model/user.model';
import { User } from '../shared/type/user.type';

@Injectable()
export class UsersService {
  dataChange$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  selectedUserChange$: BehaviorSubject<User> = new BehaviorSubject(null);

  data = (): User[] => this.dataChange$.value;

  constructor() {
    this.initialize();
  }

  initialize() {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push(new UserImpl(`${i}`, `user ${i}`));
    }

    this.dataChange$.next(users);
  }
}
