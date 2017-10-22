import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/type/user.type';

export class UsersDataSource extends DataSource<User> {
  constructor(private dataChange$: BehaviorSubject<User[]>, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<User[]> {
    const displayDataChanges = [
      this.paginator.page,
      this.dataChange$
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

      return this.dataChange$.value.slice(startIndex, startIndex + this.paginator.pageSize);
    });
  }

  disconnect(): void {
    // No-op
  }
}
