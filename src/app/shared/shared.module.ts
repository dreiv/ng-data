import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import { UserChartComponent } from '../features/user-chart/user-chart.component';
import { UserDialogComponent } from '../features/user-dialog/user-dialog.component';
import { UsersTableComponent } from '../features/users-table/users-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    UsersTableComponent,
    UserDialogComponent,
    UserChartComponent
  ],
  entryComponents: [UserDialogComponent],
  exports: [
    CommonModule,
    FormsModule,

    UsersTableComponent,
    UserChartComponent
  ]
})
export class SharedModule {}
