import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface PersonData {
  id: string;
  name: string;
}

@Injectable()
export class PersonsDatabaseService {
  private dataChange$: BehaviorSubject<PersonData[]> = new BehaviorSubject([]);

  constructor() {
    this.initialize();
  }

  get data(): PersonData[] { return this.dataChange$.value; }

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
