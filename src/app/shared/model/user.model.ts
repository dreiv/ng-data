import { User } from '../type/user.type';

export class UserImpl implements User {
  constructor(public id: string, public name: string) {}
}
