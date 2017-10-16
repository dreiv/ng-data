import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person } from '../shared/type/person.type';

@Injectable()
export class PersonsService {
  private dataChange$: BehaviorSubject<Person[]> = new BehaviorSubject([]);

  constructor() {
    this.initialize();
  }

  get data(): Person[] { return this.dataChange$.value; }

  initialize() {
    this.dataChange$.next([]);
    for (let i = 0; i < 100; i++) {
      const copiedData = this.data.slice();
      copiedData.push({
        id: `${i + 1}`,
        name: `person${ i + 1 }`
      });

      this.dataChange$.next(copiedData);
    }
  }
}
