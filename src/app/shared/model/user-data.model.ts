import { UserData } from '../type/user-data.type';

export class UserDataImpl implements UserData {
  constructor(public colDef,
              public headerDef,
              public celDef) {}
}
