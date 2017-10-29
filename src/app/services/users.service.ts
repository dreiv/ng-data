import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../shared';
import { UserDataImpl } from '../shared/model/user-data.model';
import { UserImpl } from '../shared/model/user.model';
import { UserData } from '../shared/type/user-data.type';

@Injectable()
export class UsersService {
  dataChange$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  selectedUserChange$: BehaviorSubject<User> = new BehaviorSubject(null);
  userData: UserData[];

  data = (): User[] => this.dataChange$.value;
  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  constructor() {
    this.userData = [
      new UserDataImpl('userId', 'Id', 'id'),
      new UserDataImpl('userName', 'Name', 'name'),
      new UserDataImpl('apples', 'Apples', 'apples'),
      new UserDataImpl('bananas', 'Bananas', 'bananas'),
      new UserDataImpl('kiwis', 'Kiwis', 'kiwis'),
      new UserDataImpl('oranges', 'Oranges', 'oranges'),
      new UserDataImpl('lemons', 'Lemons', 'lemons')
    ];

    const users = [];
    for (let i = 1; i <= 100; i++) {
      const apples = this.getRandomInt(1, 10);
      const bananas = this.getRandomInt(2, 14);
      const kiwis = this.getRandomInt(3, 18);
      const oranges = this.getRandomInt(1, 6);
      const lemons = this.getRandomInt(2, 8);

      users.push(
        new UserImpl(
          `${i}`,
          `user ${i}`,
          apples,
          bananas,
          kiwis,
          oranges,
          lemons));
    }

    this.dataChange$.next(users);
  }
}
