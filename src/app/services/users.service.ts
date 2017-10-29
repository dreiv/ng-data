import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../shared';
import { UserDataImpl } from '../shared/model/user-data.model';
import { UserImpl } from '../shared/model/user.model';
import { UserData } from '../shared/type/user-data.type';
import { getRandomInt, getRandomNickname } from './utils';

@Injectable()
export class UsersService {
  dataChange$: BehaviorSubject<User[]> = new BehaviorSubject([]);
  selectedUserChange$: BehaviorSubject<User> = new BehaviorSubject(null);
  userData: UserData[];

  data = (): User[] => this.dataChange$.value;

  constructor() {
    this.userData = [
      new UserDataImpl('userId', 'Id', 'id'),
      new UserDataImpl('nickname', 'Nickname', 'nickname'),
      new UserDataImpl('age', 'Age', 'age'),
      new UserDataImpl('apples', 'Apples', 'apples'),
      new UserDataImpl('bananas', 'Bananas', 'bananas'),
      new UserDataImpl('kiwis', 'Kiwis', 'kiwis'),
      new UserDataImpl('oranges', 'Oranges', 'oranges'),
      new UserDataImpl('lemons', 'Lemons', 'lemons')
    ];

    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push(
        new UserImpl(
          `${i}`,
          getRandomNickname(),
          getRandomInt(7, 55),
          getRandomInt(1, 20),
          getRandomInt(2, 14),
          getRandomInt(3, 18),
          getRandomInt(1, 6),
          getRandomInt(2, 8)));
    }

    this.dataChange$.next(users);
  }
}
