import { User } from '../type/user.type';

export class UserImpl implements User {
  constructor(public id: string,
              public nickname: string,
              public age: number,
              public apples: number,
              public bananas: number,
              public kiwis: number,
              public oranges: number,
              public lemons: number) {}
}
