import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { PersonData, PersonsDatabaseService } from '../../persons-database.service';

export class PersonDataSource extends DataSource<PersonData> {

  constructor(private personsDB: PersonsDatabaseService,
              private paginator: MatPaginator,
              private sort: MatSort) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<PersonData[]> {
    const displayDataChanges = [
      this.paginator.page,
      this.sort.sortChange,
      this.personsDB.data
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.personsDB.data.slice();

      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect(collectionViewer: CollectionViewer): void {
    // No-op
  }
}
