import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { PersonsService } from '../../services/persons.service';
import { Person } from '../../shared';

export class PersonDataSource extends DataSource<Person> {

  constructor(private persons: PersonsService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Person[]> {
    return Observable.of(this.persons.data);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    // No-op
  }
}
