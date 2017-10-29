import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { UserDialogComponent } from '../features/user-dialog/user-dialog.component';
import { UsersComponent } from '../features/users/users.component';

@NgModule({
  imports: [
    CommonModule,

    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent
  ],
  entryComponents: [UserDialogComponent],
  exports: [
    CommonModule,

    UsersComponent
  ]
})
export class SharedModule {}
