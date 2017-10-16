import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PersonsService } from '../../services/persons.service';
import { PersonDataSource } from './person-data-source';

export type UserProperty = 'userId' | 'userName' | undefined;

export const UserProperty = {
  Id: 'userId' as UserProperty,
  Name: 'userName' as UserProperty
};

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  dataSource: PersonDataSource | null;
  displayedColumns: UserProperty[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private personsDB: PersonsService) {}

  ngOnInit() {
    this.connect();
  }

  connect() {
    this.displayedColumns = [
      UserProperty.Id,
      UserProperty.Name
    ];

    this.dataSource = new PersonDataSource(this.personsDB);
  }

}
