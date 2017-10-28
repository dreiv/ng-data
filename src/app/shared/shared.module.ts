import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { UsersComponent } from '../features/users/users.component';

@NgModule({
  imports: [
    CommonModule,

    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [UsersComponent],
  exports: [
    CommonModule,

    UsersComponent
  ]
})
export class SharedModule {}
